const { CustomAPIError } = require('../utils/response-factory');

const errorHandleMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message, success: err.success, statusCode: err.statusCode });
  }

  return res.status(500).json({
    msg: err.message || 'Unexpected error ocurred',
    statusCode: 500,
    success: false,
  });
}

module.exports = { errorHandleMiddleware };