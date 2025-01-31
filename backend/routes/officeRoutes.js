const express = require("express");
const { getOffices } = require("../controllers/officeController");

const router = express.Router();

router.get("/", getOffices);

module.exports = router;
