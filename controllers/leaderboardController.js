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
