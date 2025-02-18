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

exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params; // Extract card ID from URL
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    // Check if the user is a business user
    if (!req.user.isBusiness) {
      return res
        .status(403)
        .json({ message: "Only business users can create cards" });
    }

    // Create new card with user ID
    const newCard = new Card({
      ...req.body,
      user_id: req.user.id,
    });

    await newCard.save();

    res
      .status(201)
      .json({ message: "Card created successfully", card: newCard });
  } catch (error) {
    console.error("Error creating card: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Only the creator of the card can update it
    if (req.user.id !== card.user_id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedCard = await Card.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Card updated successfully", card: updatedCard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Logged-in user ID

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Check if user already liked the card
    if (card.likes.includes(userId)) {
      // Unlike the card (remove user from likes array)
      card.likes = card.likes.filter((like) => like !== userId);
    } else {
      // Like the card (add user to likes array)
      card.likes.push(userId);
    }

    await card.save();

    res
      .status(200)
      .json({ message: "Card like status updated", likes: card.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Only the creator of the card or an admin can delete it
    if (req.user.id !== card.user_id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Card.findByIdAndDelete(id);

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






