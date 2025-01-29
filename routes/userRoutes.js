const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// Route: Register User
router.post("/", registerUser);

// Route: Login User
router.post("/login", loginUser);

// Route: Get all users (Admins only)
router.get("/", authenticate, authorizeAdmin, getAllUsers);

// Route: Get user by ID
router.get("/:id", authenticate, getUserById);

module.exports = router;
