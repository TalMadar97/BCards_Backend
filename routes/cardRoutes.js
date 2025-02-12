const express = require("express");
const router = express.Router();
const { getAllCards } = require("../controllers/cardController");

// Get all cards (Public)
router.get("/", getAllCards);

module.exports = router;
