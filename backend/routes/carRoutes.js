const express = require("express");
const { searchCars } = require("../controllers/carController");

const router = express.Router();

router.get("/search", searchCars);

module.exports = router; // ✅ Ensure router is exported properly
