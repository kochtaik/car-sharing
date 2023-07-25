const baseSuccessResponse = { success: true };

function successReadResponse(data) {
  return { ...baseSuccessResponse, data };
}

function successUpdateResponse(nbHits) {
  return { ...baseSuccessResponse, nbHits };
}

class CustomAPIError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.success = false;
    this.statusCode = statusCode;
  }
}

module.exports = {
  baseSuccessResponse,
  successReadResponse,
  successUpdateResponse,
  CustomAPIError,
}