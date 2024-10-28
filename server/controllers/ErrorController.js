module.exports = (err, req, res, next) => {
  console.log(err.status);
  console.log(err.statusCode);

  err.statusCode = err.statusCode || 500;

  console.log(err);
  
  res.status(err.statusCode).json({ message: err.message });
};

