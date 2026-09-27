const mongoose = require("mongoose");

// A confirmed (or pending/cancelled) reservation. `pricing` is always what the
// server calculated, not whatever the client sent — see utils/pricing.js and
// bookingsController.createBooking.
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true }, // Firebase uid

    kind: {
      type: String,
      enum: ["home", "experience", "service"],
      required: true,
    },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },

    // Homes use a date range; experiences/services use a single date.
    checkIn: { type: Date },
    checkOut: { type: Date },
    date: { type: Date },

    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      infants: { type: Number, default: 0 },
      pets: { type: Number, default: 0 },
    },

    pricing: {
      nightlyPrice: { type: Number, required: true },
      nights: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      serviceFee: { type: Number, required: true },
      total: { type: Number, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
