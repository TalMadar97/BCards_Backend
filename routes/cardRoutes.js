const express = require("express");
const router = express.Router();
const { getAllCards, getUserCards, getCardById, createCard, updateCard, likeCard } = require("../controllers/cardController");
const { authenticate } = require("../middlewares/authMiddleware");

// Get all cards (Public)
router.get("/", getAllCards);

// Get user's own cards (Authenticated users)
router.get("/my-cards", authenticate, getUserCards);

// Get a specific card by ID 
router.get("/:id", getCardById);

// Create a new card (Only Business Users)
router.post("/", authenticate, createCard);

// Update a card (Only the creator)
router.put("/:id", authenticate, updateCard);

// Like or Unlike a card (Any registered user)
router.patch("/:id", authenticate, likeCard);

module.exports = router;
