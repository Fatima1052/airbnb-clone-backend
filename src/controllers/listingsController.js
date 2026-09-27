const Listing = require("../models/Listing");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/listings?kind=home&city=Lahore&type=room&minPrice=0&maxPrice=0
//   &minRating=0&guestFavorite=true&category=popularHomes&search=villa
//   &page=1&limit=24
//
// Mirrors the frontend's DEFAULT_FILTERS (src/utils/searchFilters.js) so
// SearchResults.jsx can eventually send these query params straight through
// instead of filtering the whole list on the client.
const getListings = asyncHandler(async (req, res) => {
  const {
    kind,
    city,
    category,
    search,
    minPrice,
    maxPrice,
    minRating,
    guestFavorite,
    page = 1,
    limit = 24,
  } = req.query;

  const query = {};

  if (kind) query.kind = kind;
  if (category) query.category = category;
  if (city) query["location.city"] = new RegExp(`^${city}$`, "i");
  if (guestFavorite === "true") query.guestFavorite = true;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice && Number(maxPrice) > 0) query.price.$lte = Number(maxPrice);
  }

  if (minRating) query.rating = { $gte: Number(minRating) };
  if (search) query.$text = { $search: search };

  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 24));

  const [items, total] = await Promise.all([
    Listing.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize),
    Listing.countDocuments(query),
  ]);

  res.json({
    items,
    total,
    page: pageNumber,
    pages: Math.max(1, Math.ceil(total / pageSize)),
  });
});

// GET /api/listings/:id — accepts either a Mongo _id or a legacy numeric id
// (?kind=home|experience|service, default "home") so existing links such as
// /listing/12 keep working during the migration off Firestore.
const getListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isObjectId = /^[a-f0-9]{24}$/i.test(id);

  const listing = isObjectId
    ? await Listing.findById(id)
    : await Listing.findOne({ legacyId: Number(id), kind: req.query.kind || "home" });

  if (!listing) throw new ApiError(404, "Listing not found");

  res.json(listing);
});

module.exports = { getListings, getListingById };
