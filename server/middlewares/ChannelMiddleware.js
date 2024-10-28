const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");

exports.channelMiddleware = catchAsync(async (req, res, next) => {
  const { members } = req.body;

  const validMembers = await User.find({ _id: { $in: members } });

  if (validMembers.length !== members.length) {
    throw new Error("Some members are not valid.");
  }

  console.log(members);

  req.body.created_by = req.user._id;

  next();
});
