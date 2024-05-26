const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderboardSchema = Schema({
  username: { type: String, required: true },
  gameId: { type: Number, required: true },
  time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
