const { z } = require("zod");

const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { calculatePricing } = require("../utils/pricing");

const guestsSchema = z.object({
  adults: z.number().int().min(1).default(1),
  children: z.number().int().min(0).default(0),
  infants: z.number().int().min(0).default(0),
  pets: z.number().int().min(0).default(0),
});

const createBookingSchema = z.object({
  kind: z.enum(["home", "experience", "service"]),
  listingId: z.string().min(1), // Mongo _id or legacy numeric id
  checkIn: z.string().optional(), // "YYYY-MM-DD"
  checkOut: z.string().optional(),
  date: z.string().optional(),
  guests: guestsSchema.default({}),
});

async function findListing(kind, listingId) {
  const isObjectId = /^[a-f0-9]{24}$/i.test(listingId);

  return isObjectId
    ? Listing.findById(listingId)
    : Listing.findOne({ legacyId: Number(listingId), kind });
}

// POST /api/bookings — auth required (see middleware/auth.js).
//
// The client only ever tells us WHAT to book and for WHEN; the price always
// comes from the listing stored in MongoDB (utils/pricing.js), and for homes
// we reject the booking if the dates overlap an existing one. Never trust a
// price or availability claim sent by the browser.
const createBooking = asyncHandler(async (req, res) => {
  const body = createBookingSchema.parse(req.body);
  const listing = await findListing(body.kind, body.listingId);

  if (!listing) throw new ApiError(404, "Listing not found");

  let checkIn;
  let checkOut;
  let date;
  let nights = 1;

  if (body.kind === "home") {
    if (!body.checkIn || !body.checkOut) {
      throw new ApiError(400, "checkIn and checkOut are required for a home booking");
    }

    checkIn = new Date(body.checkIn);
    checkOut = new Date(body.checkOut);

    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) {
      throw new ApiError(400, "checkOut must be a valid date after checkIn");
    }

    nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    // Overlap rule: an existing booking blocks this one unless it ends on or
    // before the new check-in, or starts on or after the new check-out.
    const overlapping = await Booking.exists({
      listing: listing._id,
      status: { $ne: "cancelled" },
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });

    if (overlapping) {
      throw new ApiError(409, "Those dates are no longer available for this listing");
    }
  } else {
    if (!body.date) throw new ApiError(400, "date is required for this booking");
    date = new Date(body.date);
    if (Number.isNaN(date.getTime())) throw new ApiError(400, "date is invalid");
  }

  const pricing = calculatePricing(listing.price, nights);

  const booking = await Booking.create({
    userId: req.user.uid,
    kind: body.kind,
    listing: listing._id,
    checkIn,
    checkOut,
    date,
    guests: body.guests,
    pricing,
    status: "confirmed",
  });

  res.status(201).json(booking);
});

// GET /api/bookings/mine — auth required.
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.uid })
    .sort({ createdAt: -1 })
    .populate("listing");

  res.json(bookings);
});

module.exports = { createBooking, getMyBookings };
