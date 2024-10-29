exports.AdminMiddleware = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  } else {
    throw new Error("Your are not admin");
  }
};
