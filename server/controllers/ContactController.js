const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");

exports.searchContacts = catchAsync(async (req, res, next) => {
  const { search } = req.body;

  const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(sanitizedSearch, "i");

  const contacts = await User.find({
    $and: [
      { _id: { $ne: req.user._id } },
      {
        $or: [{ username: regex }, { email: regex }],
      },
    ],
  });

  return res.status(200).json({ contacts });
});

exports.getContactForDMList = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const contacts = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $sort: { timestamp: -1 },
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ["$sender", userId] },
            then: "$recipient",
            else: "$sender",
          },
        },
        lastMessageTime: { $first: "$timestamp" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "contactInfo",
      },
    },
    {
      $unwind: "$contactInfo",
    },
    {
      $project: {
        _id: 1,
        lastMessageTime: 1,
        email: "$contactInfo.email",
        username: "$contactInfo.username",
        image: "$contactInfo.image",
      },
    },
    {
      $sort: { lastMessageTime: -1 },
    },
  ]);

  return res.status(200).json({ contacts });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  const contacts = users.map((user) => ({
    value: user._id,
    label: user.username,
  }));
  return res.status(200).json({ contacts });
});
