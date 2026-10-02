const path = require("path");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const listingsRouter = require("./routes/listings");
const bookingsRouter = require("./routes/bookings");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// CORS_ORIGIN is a comma-separated list, e.g.
// "http://localhost:3000,https://airbnb-clone-steel-tau.vercel.app"
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // No Origin header (curl, server-to-server, health checks) is always allowed.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Seeded listings' photos (see seed/data.js). Served from the backend itself
// so it doesn't depend on the frontend's dev server being up — Cross-Origin-Resource-Policy
// is relaxed just for this route so <img> tags on a different origin (the
// frontend, port 3000) can load them.
app.use(
  "/images",
  (req, res, next) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "..", "public", "images"))
);

app.use("/api/listings", listingsRouter);
app.use("/api/bookings", bookingsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
