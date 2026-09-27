// Populates MongoDB with the 90 listings the frontend used to keep in
// src/data/*.js and Firestore. Safe to run more than once: each listing is
// upserted by (kind, legacyId), so re-running just refreshes the fields
// instead of creating duplicates.
//
// Usage (from this folder):
//   npm run seed
require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../src/config/db");
const Listing = require("../src/models/Listing");
const { HOMES, EXPERIENCES, SERVICES, CITY_COORDS } = require("./data");

const HOST_NAMES = ["Hassan", "Ali", "Ayesha", "Sarah", "Usman", "Emma"];
const AMENITIES = [
  "Fast WiFi",
  "Kitchen",
  "Free parking on premises",
  "58” smart TV",
  "Air conditioning",
  "Heating",
  "Washing machine",
  "Self check-in",
  "24/7 elevator",
  "UPS backup",
];

// Deterministic placeholder photos (no real hosted images yet) — replace with
// Cloudinary/S3 URLs once uploads are wired up.
function placeholderImages(seed, count = 5) {
  return Array.from({ length: count }, (_, index) => `https://picsum.photos/seed/${seed}-${index}/1200/800`);
}

function toHomeDoc(home) {
  const isPrivateRoom = home.title.toLowerCase().includes("room");

  return {
    legacyId: home.id,
    kind: "home",
    title: home.title,
    category: home.category,
    price: home.price,
    currency: "USD",
    priceUnit: "night",
    rating: home.rating,
    guestFavorite: home.guestFavorite,
    location: {
      city: home.city,
      country: "Pakistan",
      coordinates: CITY_COORDS[home.city],
    },
    images: placeholderImages(`home-${home.id}`, 6),
    placeType: isPrivateRoom ? "Private room" : "Entire home",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: AMENITIES,
    cancellationPolicy: "Free cancellation",
    description:
      "Enjoy a comfortable and stylish stay. This welcoming property offers a relaxing space with convenient amenities for a memorable trip.",
    host: {
      name: HOST_NAMES[(home.id - 1) % HOST_NAMES.length],
      isSuperhost: home.id % 3 !== 0,
      hostingYears: 2 + (home.id % 5),
      responseRate: 90 + (home.id % 11),
      responseTime: home.id % 3 === 0 ? "Within an hour" : home.id % 3 === 1 ? "Within a few hours" : "Within a day",
      bio: "I love welcoming guests and helping them have a comfortable and memorable stay.",
    },
  };
}

function toExperienceOrServiceDoc(kind, item) {
  return {
    legacyId: item.id,
    kind,
    title: item.title,
    price: item.price,
    currency: "USD",
    priceUnit: item.unit || "guest",
    rating: item.rating,
    location: { city: item.city, country: item.country },
    images: placeholderImages(`${kind}-${item.id}`, 5),
    description:
      kind === "experience"
        ? "A hands-on activity led by a local host — small groups, all skill levels welcome."
        : "A one-on-one service booked directly with the provider at a time that works for you.",
    host: {
      name: HOST_NAMES[(item.id - 1) % HOST_NAMES.length],
      isSuperhost: false,
      hostingYears: 1 + (item.id % 4),
      responseRate: 95,
      responseTime: "Within a few hours",
      bio: "",
    },
  };
}

async function seed() {
  await connectDB();

  const docs = [
    ...HOMES.map(toHomeDoc),
    ...EXPERIENCES.map((item) => toExperienceOrServiceDoc("experience", item)),
    ...SERVICES.map((item) => toExperienceOrServiceDoc("service", item)),
  ];

  const operations = docs.map((doc) => ({
    updateOne: {
      filter: { kind: doc.kind, legacyId: doc.legacyId },
      update: { $set: doc },
      upsert: true,
    },
  }));

  const result = await Listing.bulkWrite(operations);

  console.log(
    `Seed complete: ${result.upsertedCount} inserted, ${result.modifiedCount} updated ` +
      `(${docs.length} listings total: ${HOMES.length} homes, ${EXPERIENCES.length} experiences, ${SERVICES.length} services).`
  );

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
