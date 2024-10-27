const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const { createToken } = require("../utils/createToken");
const catchAsync = require("../utils/catchAsync");

const dotenv = require("dotenv");

dotenv.config();

exports.register = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg, { status: 400 });
  }
  const { username, email, password } = req.body;

  const user = await User.register(username, email, password);
  user.password = undefined;

  res.cookie("jwt", createToken(user._id), {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    status: "success",
    userInfo: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg, { status: 400 });
  }

  const { email, password } = req.body;

  const user = await User.login(email, password);
  user.password = undefined;

  res.cookie("jwt", createToken(user._id), {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    status: "success",
    userInfo: user,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", null, { maxAge: 1 });
  return res.json({ message: "user logged out" });
});

exports.me = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    userInfo: req.user,
    isAuthenticated: req?.user ? true : false,
  });
});
