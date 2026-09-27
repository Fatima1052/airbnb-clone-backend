// A small error class so controllers can say exactly what HTTP status and
// message a failure should produce, e.g. `throw new ApiError(404, "Listing not found")`.
// errorHandler.js turns this into the JSON response.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
