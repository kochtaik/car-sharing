const { errorResponse, isCustomErrorResponse } = require('../utils/response-factory');

const errorHandleMiddleware = (err, req, res, next) => {
  if (isCustomErrorResponse(err)) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  return res.status(500).json(errorResponse('Unexpected error ocurred', 500));
}

module.exports = { errorHandleMiddleware };