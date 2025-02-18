const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidation = require("../helpers/registerValidation");
const loginValidation = require("../helpers/loginValidation");
const userService = require("../services/userService");
const { updateUserById } = require("../services/userService");
const updateUserValidation = require("../helpers/updateValidation");
const booleanValidation = require("../helpers/booleanValidation");


// Register User function
exports.registerUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      name,
      phone,
      email,
      password,
      image,
      address,
      isAdmin,
      isBusiness,
    } = req.body;

    if (await userService.isExist(email)) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //Create and save the new user
    const newUser = await userService.create({
      name,
      phone,
      email,
      password,
      image,
      address,
      isAdmin: isAdmin || false,
      isBusiness: isBusiness || false,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User function
exports.loginUser = async (req, res) => {
  try {
    // Validate user input using Joi
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All users Function - only admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user by ID function
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the requesting user is updating their own profile or is an admin
    if (req.user.id !== id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Prevent updates to email and password
    if (req.body.email || req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password cannot be changed" });
    }

    // Validate request payload using Joi
    const { error } = updateUserValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Call the user service to update the user
    const updatedUser = await updateUserById(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// change isBusiness Boolean
exports.toggleBusinessStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request payload using Joi
    const { error } = booleanValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is authorized to change this status
    if (req.user.id !== user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update the boolean value
    user.isBusiness = req.body.isBusiness;
    await user.save();

    res.status(200).json({
      message: "User business status updated successfully",
      isBusiness: user.isBusiness,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the requesting user is deleting their own account or is an admin
    if (req.user.id !== id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find and delete the user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

