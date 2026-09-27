const { Router } = require("express");
const { getListings, getListingById } = require("../controllers/listingsController");

const router = Router();

router.get("/", getListings);
router.get("/:id", getListingById);

module.exports = router;
