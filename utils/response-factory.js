const baseSuccessResponse = { success: true };
const baseErrorResponse = { success: false };

function successReadResponse(data) {
  return { ...baseSuccessResponse, data };
}

function successUpdateResponse(nbHits) {
  return { ...baseSuccessResponse, nbHits };
}

function errorResponse(message) {
  return { ...baseErrorResponse, message };
}

module.exports = {
  baseSuccessResponse,
  successReadResponse,
  successUpdateResponse,
  errorResponse,
}