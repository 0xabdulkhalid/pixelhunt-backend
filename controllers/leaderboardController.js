const asyncHandler = require("express-async-handler");
const Leaderboard = require("../models/leaderboard");

exports.add_score = asyncHandler(async (req, res, next) => {
  const score = new Leaderboard({
    username: req.body.username,
    gameId: req.params.gameId,
    time: req.body.duration,
  });

  const result = await score.save();
  return res.status(201).json({ success: true });
});

exports.get_scores = asyncHandler(async (req, res, next) => {
  const gameId = req.params.gameId;

  if (!gameId) {
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
