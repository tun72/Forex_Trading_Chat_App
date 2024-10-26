const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const AuthMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) return res.status(403).json("Invalid Token");

  const checkToken = await jwt.verify(token, process.env.MY_SECRET);

  if (!checkToken) {
    return res.status(401).json({ message: "unauthenticated" });
  }

  const existUser = await User.findById(checkToken._id);

  if (!existUser) return res.status(401).json({ message: "unauthenticated" });

  req.user = existUser;

  next();
};

module.exports = AuthMiddleware;
