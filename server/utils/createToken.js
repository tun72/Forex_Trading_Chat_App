const jwt = require("jsonwebtoken");
const maxAge = 60 * 60 * 24 * 3; // 3 days
exports.createToken = function (_id) {
  return jwt.sign({ _id }, process.env.MY_SECRET, { expiresIn: maxAge });
};
