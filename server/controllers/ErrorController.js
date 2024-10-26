module.exports = (err, req, res, next) => {
  console.log(err.status);
  console.log(err.statusCode);

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ message: err.message });
};

