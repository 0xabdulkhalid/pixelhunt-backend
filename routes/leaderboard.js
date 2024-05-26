const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

router.post("/add-score/:gameId", leaderboardController.add_score);

module.exports = router;
