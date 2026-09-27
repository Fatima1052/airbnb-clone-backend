const mongoose = require("mongoose");

// One schema for homes, experiences and services — `kind` says which. This
// mirrors the shape the frontend's src/data/catalog.js already expects, plus
// the longer detail fields the old "listingDetails" Firestore collection held.
//
// `legacyId` + `kind` are kept so favorites saved under the old numeric ids
// (see the frontend's favoriteKey()) can still be looked up during migration.
const listingSchema = new mongoose.Schema(
  {
    legacyId: { type: Number, index: true },
    kind: {
      type: String,
      enum: ["home", "experience", "service"],
      default: "home",
      index: true,
    },

    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" }, // home page row, e.g. "popularHomes"

    price: { type: Number, required: true, min: 0 }, // per night / per guest, numeric
    currency: { type: String, default: "USD" },
    priceUnit: { type: String, default: "night" }, // "night" | "guest" | "group"

    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    guestFavorite: { type: Boolean, default: false },

    location: {
      city: { type: String, required: true, index: true },
      country: { type: String, default: "" },
      coordinates: { type: [Number], default: undefined }, // [lng, lat]
    },

    images: { type: [String], default: [] },

    // Home-only detail fields (ignored for experiences/services).
    placeType: { type: String, default: "" },
    guests: { type: Number, default: 0 },
    bedrooms: { type: Number, default: 0 },
    beds: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    amenities: { type: [String], default: [] },
    cancellationPolicy: { type: String, default: "Free cancellation" },

    host: {
      name: { type: String, default: "" },
      isSuperhost: { type: Boolean, default: false },
      hostingYears: { type: Number, default: 1 },
      responseRate: { type: Number, default: 100 },
      responseTime: { type: String, default: "Within a day" },
      bio: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

listingSchema.index({ kind: 1, legacyId: 1 }, { unique: true, sparse: true });
listingSchema.index({ title: "text", "location.city": "text" });

module.exports = mongoose.model("Listing", listingSchema);
