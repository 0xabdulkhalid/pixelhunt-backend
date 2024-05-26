const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

router.post("/add-score/:gameId", leaderboardController.add_score);

router.get("/scores/:gameId", leaderboardController.get_scores);

module.exports = router;
