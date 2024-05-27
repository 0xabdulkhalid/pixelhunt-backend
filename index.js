const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const leaderboard = require("./routes/leaderboard");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST",
  })
);

const mongoDB = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/leaderboard", leaderboard);

// Error handlers
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});
