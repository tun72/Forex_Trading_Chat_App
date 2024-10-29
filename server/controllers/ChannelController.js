const Channel = require("../models/ChannelModel");

const catchAsync = require("../utils/catchAsync");
const factory = require("./FactoryHandler");
// const mongoose = require("mongoose");

exports.createChannel = factory.createOne(Channel);

exports.deleteChannel = factory.deleteOne(Channel);

exports.updateChannel = factory.updateOne(Channel);

exports.getUserChannels = catchAsync(async (req, res, next) => {
  // const channels = await Channel.find({
  //   $or: [{ created_by: userId }, { members: userId }],
  // }).sort({ updatedAt: -1 });

  const channels = await Channel.find().sort({ updatedAt: -1 });

  return res.status(200).json({ channels });
});

exports.getChannelMessages = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;

  const channel = await Channel.findById(channelId)
    .populate({
      path: "messages",
      populate: {
        path: "sender",
      },
    })
    .populate("members");

  return res
    .status(200)
    .json({ messages: channel.messages, members: channel.members });
});
