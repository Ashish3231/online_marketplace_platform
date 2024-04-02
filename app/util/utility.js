const Sequelize = require('sequelize');
const CustomError = require('./customError');

/// ------- Database Error Handing --------
exports.parseDBError = (error) => {
  const errorMessage = error.message;
  console.log(error.constructor);

  if (error instanceof Sequelize.UniqueConstraintError) {
    return { status: 409, message: errorMessage };
  }

  if (error instanceof Sequelize.ValidationError) {
    return { status: 400, message: errorMessage };
  }

  if (error instanceof CustomError) {
    return { status: error.code, message: errorMessage };
  }

  return { status: 500, message: errorMessage };
};

/// ------- Api Response data -------------
exports.sendData = (status, msg, data) => {
  return { status, message: msg, data };
};
