/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const AppError = require('./../utilis/appError');

sendError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

handleServerError = (err) => {
  return new AppError('Internal Server Error', 500);
}

handleNotFoundError = (err) => {
  return new AppError('Resource Not Found', 404);
}

handleBadRequestError = (err) => {
  return new AppError('Bad Request', 400);
}



module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.statusCode === 500) err = handleServerError(err)
  if (err.statusCode === 404) err = handleNotFoundError(err)
  if (err.statusCode === 400) err = handleBadRequestError(err)
  
  sendError(err, res);
}