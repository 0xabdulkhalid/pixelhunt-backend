const asyncHandler = require("express-async-handler");
const Leaderboard = require("../models/leaderboard");

exports.add_score = asyncHandler(async (req, res, next) => {
  const gameId = req.params.gameId;
  const { username, duration } = req.body;

  if (!gameId) {
    return res.status(403).json({
      message: "Game ID is required to add scores",
    });
  }

  if (!username || !duration) {
    return res.status(400).json({
      message: "Username and duration are required",
    });
  }

  // Find existing score for the username and gameId
  const existingScore = await Leaderboard.findOne({ username, gameId });

  if (existingScore) {
    // If existing score is found, compare and update if the new score(duration) is lesser
    if (duration < existingScore.time) {
      existingScore.time = duration;
      await existingScore.save();
      return res.status(200).json({ success: true, message: "Score updated" });
    } else {
      return res.status(200).json({
        success: true,
        message: "New score's duration is not lesser than the existing score",
      });
    }
  } else {
    // If no existing score is found, create a new score entry
    const newScore = new Leaderboard({
      username,
      gameId,
      time: duration,
    });

    const result = await newScore.save();
    return res.status(201).json({ success: true, message: "Score added" });
  }
});

exports.get_scores = asyncHandler(async (req, res, next) => {
  if (!req.params.gameId) {
    return res.status(403).json({
      message: "Game ID is required to view scores",
    });
  }

  const scores = await Leaderboard.find()
    .select("username createdAt time")
    .sort({ time: 1 })
    .exec();

  return res.status(200).json(scores);
});
