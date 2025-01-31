const express = require("express");
const { createCar, getCars } = require("../controllers/carController"); // ✅ Correct import

const router = express.Router();

router.post("/", createCar); // ✅ Route to create a car
router.get("/", getCars);    // ✅ Route to get all cars

module.exports = router;
