const express = require("express");
const { getNearestOffices } = require("../controllers/officeController"); // ✅ Correct import

const router = express.Router();

router.get("/", getNearestOffices); // ✅ Route to get nearest rental offices

module.exports = router;
