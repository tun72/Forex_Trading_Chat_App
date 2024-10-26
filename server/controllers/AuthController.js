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

  const token = await createToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    message: "success",
    user,
    token: token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg, { status: 400 });

    // return res.status(400).json({
    //   isSuccess: false,
    //   message: errors.array()[0].msg,
    // });
  }

  const { email, password } = req.body;

  const user = await User.login(email, password);

  const token = createToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    message: "success",
    token,
    user,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", null, { maxAge: 1 });
  return res.json({ message: "user logged out" });
});

exports.me = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    user: req.user,
    isAuthenticated: req?.user ? true : false,
  });
});
