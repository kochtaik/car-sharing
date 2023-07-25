const baseSuccessResponse = { success: true };
const baseErrorResponse = { success: false };

function successReadResponse(data) {
  return { ...baseSuccessResponse, data };
}

function successUpdateResponse(nbHits) {
  return { ...baseSuccessResponse, nbHits };
}

function errorResponse(message, statusCode) {
  return { ...baseErrorResponse, message, statusCode };
}

function isCustomErrorResponse(err) {
  return !!err.statusCode && !!err.message;
}

module.exports = {
  baseSuccessResponse,
  successReadResponse,
  successUpdateResponse,
  errorResponse,
  isCustomErrorResponse,
}