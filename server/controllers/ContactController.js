const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");
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
