const Card = require("../models/Card");

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserCards = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID
    const userCards = await Card.find({ user_id: userId });

    res.status(200).json(userCards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

