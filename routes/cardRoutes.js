const express = require("express");
const router = express.Router();
const { getAllCards, getUserCards, getCardById } = require("../controllers/cardController");
const { authenticate } = require("../middlewares/authMiddleware");

// Get all cards (Public)
router.get("/", getAllCards);

// Get user's own cards (Authenticated users)
router.get("/my-cards", authenticate, getUserCards);

// Get a specific card by ID 
router.get("/:id", getCardById);

module.exports = router;
