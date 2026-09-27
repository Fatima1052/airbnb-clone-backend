const { Router } = require("express");
const { createBooking, getMyBookings } = require("../controllers/bookingsController");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.post("/", requireAuth, createBooking);
router.get("/mine", requireAuth, getMyBookings);

module.exports = router;
