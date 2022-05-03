const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  console.log(err);
  
  res
    .status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      message: err.message || "Something went wrong."
    });
};


module.exports = errorHandler