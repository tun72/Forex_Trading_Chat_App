const Channel = require("../models/ChannelModel");

const catchAsync = require("../utils/catchAsync");
const factory = require("./FactoryHandler");
const mongoose = require("mongoose");

exports.createChannel = factory.createOne(Channel);

exports.getUserChannels = catchAsync(async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);
  const channels = await Channel.find({
    $or: [{ created_by: userId }, { members: userId }],
  }).sort({ updatedAt: -1 });

  console.log(channels);

  return res.status(200).json({ channels });
});

exports.getChannelMessages = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;

  const channel = await Channel.findById(channelId).populate({
    path: "messages",
    populate: {
      path: "sender",
    },
  });
  const messages = channel.messages;

  return res.status(200).json({ messages });
});
