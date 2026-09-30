// Transcribed from the frontend's src/data/listingsData.js, experienceData.js
// and servicesData.js, with prices as plain numbers instead of strings like
// "$46 for 2 nights". Real photos aren't available outside the frontend
// bundle (they're local webpack imports), so seedListings.js generates
// placeholder image URLs instead — swap those for real hosted images
// (Cloudinary/S3) once you have them.

const HOMES = [
  // category: popularHomes — Islamabad
  { id: 1, title: "Room in Islamabad", price: 46, rating: 4.91, guestFavorite: true, city: "Islamabad", category: "popularHomes" },
  { id: 2, title: "Apartment in Islamabad", price: 58, rating: 4.88, guestFavorite: false, city: "Islamabad", category: "popularHomes" },
  { id: 3, title: "Luxury Villa", price: 82, rating: 4.95, guestFavorite: true, city: "Islamabad", category: "popularHomes" },
  { id: 4, title: "Modern Home", price: 65, rating: 4.89, guestFavorite: true, city: "Islamabad", category: "popularHomes" },
  { id: 5, title: "Guest House", price: 52, rating: 4.93, guestFavorite: true, city: "Islamabad", category: "popularHomes" },
  { id: 6, title: "Mountain View", price: 74, rating: 4.97, guestFavorite: true, city: "Islamabad", category: "popularHomes" },

  // category: greatHotels — Islamabad
  { id: 7, title: "Hotel in Islamabad", price: 78, rating: 4.95, guestFavorite: true, city: "Islamabad", category: "greatHotels" },
  { id: 8, title: "Luxury Hotel", price: 92, rating: 4.91, guestFavorite: true, city: "Islamabad", category: "greatHotels" },
  { id: 9, title: "Boutique Hotel", price: 65, rating: 4.88, guestFavorite: false, city: "Islamabad", category: "greatHotels" },
  { id: 10, title: "Modern Hotel", price: 81, rating: 4.93, guestFavorite: true, city: "Islamabad", category: "greatHotels" },
  { id: 11, title: "Resort Hotel", price: 105, rating: 4.97, guestFavorite: true, city: "Islamabad", category: "greatHotels" },
  { id: 12, title: "City Hotel", price: 70, rating: 4.90, guestFavorite: false, city: "Islamabad", category: "greatHotels" },

  // category: weekendHomes — Lahore
  { id: 13, title: "Apartment in Lahore", price: 65, rating: 4.92, guestFavorite: true, city: "Lahore", category: "weekendHomes" },
  { id: 14, title: "Room in Lahore", price: 48, rating: 4.89, guestFavorite: false, city: "Lahore", category: "weekendHomes" },
  { id: 15, title: "Luxury Apartment", price: 85, rating: 4.96, guestFavorite: true, city: "Lahore", category: "weekendHomes" },
  { id: 16, title: "Modern Condo", price: 72, rating: 4.90, guestFavorite: true, city: "Lahore", category: "weekendHomes" },
  { id: 17, title: "Family Home", price: 58, rating: 4.88, guestFavorite: false, city: "Lahore", category: "weekendHomes" },
  { id: 18, title: "Studio Apartment", price: 55, rating: 4.91, guestFavorite: true, city: "Lahore", category: "weekendHomes" },

  // category: stayInMurree — Murree
  { id: 19, title: "Cabin in Murree", price: 68, rating: 4.94, guestFavorite: true, city: "Murree", category: "stayInMurree" },
  { id: 20, title: "Mountain Cottage", price: 74, rating: 4.91, guestFavorite: true, city: "Murree", category: "stayInMurree" },
  { id: 21, title: "Luxury Apartment", price: 81, rating: 4.96, guestFavorite: false, city: "Murree", category: "stayInMurree" },
  { id: 22, title: "Forest View Home", price: 63, rating: 4.89, guestFavorite: true, city: "Murree", category: "stayInMurree" },
  { id: 23, title: "Family Cottage", price: 72, rating: 4.93, guestFavorite: true, city: "Murree", category: "stayInMurree" },
  { id: 24, title: "Wooden Cabin", price: 85, rating: 4.98, guestFavorite: true, city: "Murree", category: "stayInMurree" },

  // category: nathiaGaliHomes — Nathia Gali
  { id: 25, title: "Cabin in Nathia Gali", price: 72, rating: 4.96, guestFavorite: true, city: "Nathia Gali", category: "nathiaGaliHomes" },
  { id: 26, title: "Mountain Cottage", price: 81, rating: 4.92, guestFavorite: true, city: "Nathia Gali", category: "nathiaGaliHomes" },
  { id: 27, title: "Luxury Chalet", price: 96, rating: 4.98, guestFavorite: true, city: "Nathia Gali", category: "nathiaGaliHomes" },
  { id: 28, title: "Forest Cabin", price: 68, rating: 4.89, guestFavorite: false, city: "Nathia Gali", category: "nathiaGaliHomes" },
  { id: 29, title: "Family Lodge", price: 75, rating: 4.91, guestFavorite: true, city: "Nathia Gali", category: "nathiaGaliHomes" },
  { id: 30, title: "Nature Stay", price: 70, rating: 4.94, guestFavorite: true, city: "Nathia Gali", category: "nathiaGaliHomes" },

  // category: karachiHomes — Karachi
  { id: 31, title: "Apartment in Karachi", price: 64, rating: 4.90, guestFavorite: true, city: "Karachi", category: "karachiHomes" },
  { id: 32, title: "Sea View Apartment", price: 88, rating: 4.96, guestFavorite: true, city: "Karachi", category: "karachiHomes" },
  { id: 33, title: "Luxury Condo", price: 94, rating: 4.97, guestFavorite: true, city: "Karachi", category: "karachiHomes" },
  { id: 34, title: "Modern Studio", price: 58, rating: 4.87, guestFavorite: false, city: "Karachi", category: "karachiHomes" },
  { id: 35, title: "Family Home", price: 71, rating: 4.92, guestFavorite: true, city: "Karachi", category: "karachiHomes" },
  { id: 36, title: "Beach House", price: 110, rating: 4.99, guestFavorite: true, city: "Karachi", category: "karachiHomes" },

  // category: faisalabadHomes — Faisalabad
  { id: 37, title: "Apartment in Faisalabad", price: 54, rating: 4.90, guestFavorite: true, city: "Faisalabad", category: "faisalabadHomes" },
  { id: 38, title: "Room in Faisalabad", price: 46, rating: 4.88, guestFavorite: false, city: "Faisalabad", category: "faisalabadHomes" },
  { id: 39, title: "Luxury Home", price: 72, rating: 4.96, guestFavorite: true, city: "Faisalabad", category: "faisalabadHomes" },
  { id: 40, title: "Modern Apartment", price: 60, rating: 4.91, guestFavorite: true, city: "Faisalabad", category: "faisalabadHomes" },
  { id: 41, title: "Family House", price: 58, rating: 4.89, guestFavorite: false, city: "Faisalabad", category: "faisalabadHomes" },
  { id: 42, title: "City View Apartment", price: 67, rating: 4.94, guestFavorite: true, city: "Faisalabad", category: "faisalabadHomes" },

  // category: dubaiPlaces — Dubai
  { id: 43, title: "Apartment in Dubai", price: 135, rating: 4.98, guestFavorite: true, city: "Dubai", category: "dubaiPlaces" },
  { id: 44, title: "Luxury Marina Apartment", price: 168, rating: 4.97, guestFavorite: true, city: "Dubai", category: "dubaiPlaces" },
  { id: 45, title: "Palm Jumeirah Villa", price: 295, rating: 5.0, guestFavorite: true, city: "Dubai", category: "dubaiPlaces" },
  { id: 46, title: "Downtown Studio", price: 142, rating: 4.93, guestFavorite: false, city: "Dubai", category: "dubaiPlaces" },
  { id: 47, title: "Burj View Apartment", price: 185, rating: 4.99, guestFavorite: true, city: "Dubai", category: "dubaiPlaces" },
  { id: 48, title: "Beach Resort Suite", price: 220, rating: 5.0, guestFavorite: true, city: "Dubai", category: "dubaiPlaces" },

  // category: bhurbanHomes — Bhurban
  { id: 49, title: "Luxury Cottage", price: 78, rating: 4.96, guestFavorite: true, city: "Bhurban", category: "bhurbanHomes" },
  { id: 50, title: "Mountain Cabin", price: 72, rating: 4.92, guestFavorite: true, city: "Bhurban", category: "bhurbanHomes" },
  { id: 51, title: "Resort Villa", price: 105, rating: 4.98, guestFavorite: true, city: "Bhurban", category: "bhurbanHomes" },
  { id: 52, title: "Forest View Home", price: 68, rating: 4.91, guestFavorite: false, city: "Bhurban", category: "bhurbanHomes" },
  { id: 53, title: "Family Cottage", price: 74, rating: 4.95, guestFavorite: true, city: "Bhurban", category: "bhurbanHomes" },
  { id: 54, title: "Premium Chalet", price: 89, rating: 4.99, guestFavorite: true, city: "Bhurban", category: "bhurbanHomes" },

  // category: istanbulHomes — Istanbul
  { id: 55, title: "Apartment in Istanbul", price: 115, rating: 4.97, guestFavorite: true, city: "Istanbul", category: "istanbulHomes" },
  { id: 56, title: "Historic City Home", price: 98, rating: 4.94, guestFavorite: true, city: "Istanbul", category: "istanbulHomes" },
  { id: 57, title: "Luxury Bosphorus View", price: 165, rating: 4.99, guestFavorite: true, city: "Istanbul", category: "istanbulHomes" },
  { id: 58, title: "Modern Studio", price: 84, rating: 4.90, guestFavorite: false, city: "Istanbul", category: "istanbulHomes" },
  { id: 59, title: "Family Apartment", price: 102, rating: 4.96, guestFavorite: true, city: "Istanbul", category: "istanbulHomes" },
  { id: 60, title: "Old Town Stay", price: 109, rating: 4.95, guestFavorite: true, city: "Istanbul", category: "istanbulHomes" },

  // category: bakuHomes — Baku
  { id: 61, title: "Apartment in Baku", price: 92, rating: 4.95, guestFavorite: true, city: "Baku", category: "bakuHomes" },
  { id: 62, title: "City Center Studio", price: 78, rating: 4.91, guestFavorite: false, city: "Baku", category: "bakuHomes" },
  { id: 63, title: "Luxury Sea View", price: 135, rating: 4.99, guestFavorite: true, city: "Baku", category: "bakuHomes" },
  { id: 64, title: "Modern Apartment", price: 88, rating: 4.93, guestFavorite: true, city: "Baku", category: "bakuHomes" },
  { id: 65, title: "Family Home", price: 95, rating: 4.97, guestFavorite: true, city: "Baku", category: "bakuHomes" },
  { id: 66, title: "Luxury Residence", price: 148, rating: 5.0, guestFavorite: true, city: "Baku", category: "bakuHomes" },
];

// [lng, lat] — used for the search map's price pins. Same cities as the
// frontend's src/data/destinations.js cityCoords.
const CITY_COORDS = {
  Islamabad: [73.0479, 33.6844],
  Lahore: [74.3587, 31.5204],
  Murree: [73.3943, 33.907],
  "Nathia Gali": [73.3806, 34.0722],
  Karachi: [67.0011, 24.8607],
  Faisalabad: [73.135, 31.4504],
  Dubai: [55.2708, 25.2048],
  Bhurban: [73.463, 33.9],
  Istanbul: [28.9784, 41.0082],
  Baku: [49.8671, 40.4093],
};

const CITY_COUNTRY = {
  Islamabad: "Pakistan",
  Lahore: "Pakistan",
  Murree: "Pakistan",
  "Nathia Gali": "Pakistan",
  Karachi: "Pakistan",
  Faisalabad: "Pakistan",
  Dubai: "United Arab Emirates",
  Bhurban: "Pakistan",
  Istanbul: "Turkey",
  Baku: "Azerbaijan",
};

const EXPERIENCES = [
  { id: 1, title: "Carve marble with a third-generation sculptor", city: "Athens", country: "Greece", price: 50, rating: 4.9 },
  { id: 2, title: "Art Walking Tour in San Miguel de Allende", city: "San Miguel de Allende", country: "Mexico", price: 39, rating: 4.8 },
  { id: 3, title: "Savor Premium Matcha in a tea ceremony", city: "Shibuya", country: "Japan", price: 37, rating: 5.0 },
  { id: 4, title: "Discover a small local producer", city: "", country: "Italy", price: 32, rating: 5.0 },
  { id: 5, title: "Participate in yoga and wellness", city: "", country: "Thailand", price: 9, rating: 4.95 },
  { id: 6, title: "Blend incense with a temple priest", city: "", country: "Japan", price: 111, rating: 4.9 },
  { id: 7, title: "Hidden Bar Hopping With A Local", city: "Kuala Lumpur", country: "Malaysia", price: 31, rating: 4.96 },
  { id: 8, title: "Authentic Malaysian Street Food Tour Kampung Baru", city: "Kuala Lumpur", country: "Malaysia", price: 37, rating: 4.97 },
  { id: 9, title: "Explore 7 Wonders Of Kuala Lumpur With A Local", city: "Kuala Lumpur", country: "Malaysia", price: 57, rating: 4.98 },
  { id: 10, title: "Explore Kuala Lumpur with Local Uncle", city: "Kuala Lumpur", country: "Malaysia", price: 58, rating: 4.8 },
  { id: 11, title: "Sambal Streets Food Tour with 15-plus tastings", city: "Kuala Lumpur", country: "Malaysia", price: 57, rating: 4.93 },
  { id: 12, title: "Step Into Batu Caves — Hidden Gems, Monkeys & Myths", city: "Kuala Lumpur", country: "Malaysia", price: 52, rating: 5.0 },
];

const SERVICES = [
  { id: 1, title: "Private Restorative Yoga Sanctuary", city: "London", country: "UK", price: 31, rating: 5.0, unit: "guest" },
  { id: 2, title: "Results-oriented fitness by Amram", city: "London", country: "UK", price: 61, rating: 5.0, unit: "guest" },
  { id: 3, title: "Magical Hands Massage in top location - Bond Street", city: "London", country: "UK", price: 61, rating: 4.94, unit: "guest" },
  { id: 4, title: "Got Your Back London, Host Advisory Board massage", city: "London", country: "UK", price: 22, rating: 5.0, unit: "guest" },
  { id: 5, title: "Solo Photoshoot London - Guided & Natural", city: "London", country: "UK", price: 115, rating: 4.92, unit: "guest" },
  { id: 6, title: "Seasonal gourmet menus by Chef Anna Jane", city: "London", country: "UK", price: 134, rating: 5.0, unit: "guest" },
  { id: 7, title: "For the love of Soccer LA Game Day Experiences", city: "Los Angeles", country: "USA", price: 95, rating: 5.0, unit: "group" },
  { id: 8, title: "LA Hair & Makeup by Ashanta Artistry", city: "Los Angeles", country: "USA", price: 200, rating: 5.0, unit: "guest" },
  { id: 9, title: "Scenic lifestyle photos by Emily", city: "Los Angeles", country: "USA", price: 130, rating: 4.95, unit: "guest" },
  { id: 10, title: "Highly-curated men's haircuts MarVista by Saints", city: "Los Angeles", country: "USA", price: 70, rating: 5.0, unit: "guest" },
  { id: 11, title: "North Hollywood High-end skin care by Ticia", city: "Los Angeles", country: "USA", price: 100, rating: 5.0, unit: "guest" },
  { id: 12, title: "Los Angeles Editorial Lifestyle Portraits & Events", city: "Los Angeles", country: "USA", price: 200, rating: 5.0, unit: "group" },
];

module.exports = { HOMES, EXPERIENCES, SERVICES, CITY_COORDS, CITY_COUNTRY };
