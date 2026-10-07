// Vercel serverless entry point. Vercel calls this for every request (see
// vercel.json rewrites); locally you still use `npm start` (src/server.js).
const app = require("../src/app");
const connectDB = require("../src/config/db");

// Reuse the DB connection across warm invocations instead of reconnecting each time.
let connecting;

module.exports = async (req, res) => {
  try {
    connecting = connecting || connectDB();
    await connecting;
  } catch (error) {
    connecting = undefined;
    console.error("MongoDB connection failed:", error.message);
    return res.status(500).json({ message: "Database connection failed" });
  }
  return app(req, res);
};
