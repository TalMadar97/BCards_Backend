const express = require("express");
const router = express.Router();
const { getAllCards, getUserCards } = require("../controllers/cardController");
const { authenticate } = require("../middlewares/authMiddleware");

// Get all cards (Public)
router.get("/", getAllCards);

// Get user's own cards (Authenticated users)
router.get("/my-cards", authenticate, getUserCards);

module.exports = router;
