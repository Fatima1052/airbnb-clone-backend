const { ZodError } = require("zod");

const ApiError = require("../utils/ApiError");

// Mounted after all routes. Any `next(error)` or thrown error inside an async
// controller (see asyncHandler in utils) ends up here.
function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // Body failed the zod schema in a controller, e.g. createBookingSchema.parse(req.body).
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request body",
      issues: error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    });
  }

  const statusCode = error instanceof ApiError ? error.statusCode : 500;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    message: error.message || "Something went wrong",
  });
}

module.exports = { notFound, errorHandler };
