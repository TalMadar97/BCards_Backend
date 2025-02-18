require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Card = require("../models/Card");
const userService = require("../services/userService");

const users = [
  {
    name: { first: "Regular", last: "User" },
    phone: "050-1234567",
    email: "regular@example.com",
    password: "Password1!",
    image: { url: "https://example.com/user1.jpg", alt: "User 1" },
    address: {
      street: "Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      houseNumber: 19,
    },
    isAdmin: false,
    isBusiness: false,
  },
  {
    name: { first: "Business", last: "User" },
    phone: "050-7654321",
    email: "business@example.com",
    password: "Password1!",
    image: { url: "https://example.com/user2.jpg", alt: "User 2" },
    address: {
      street: "Broadway",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
      houseNumber: 16,
    },
    isAdmin: false,
    isBusiness: true,
  },
  {
    name: { first: "Admin", last: "User" },
    phone: "050-9876543",
    email: "admin@example.com",
    password: "AdminPass1!",
    image: { url: "https://example.com/admin.jpg", alt: "Admin User" },
    address: {
      street: "Wall Street",
      city: "New York",
      state: "NY",
      zip: "10005",
      country: "USA",
      houseNumber: 18,
    },
    isAdmin: true,
    isBusiness: false,
  },
];

const cards = [
  {
    title: "Best Coffee Shop",
    subtitle: "Your daily dose of caffeine",
    description: "We serve the best coffee in town!",
    phone: "050-3334444",
    email: "coffee@example.com",
    web: "https://coffee-shop.com",
    image: { url: "https://example.com/coffee.jpg", alt: "Coffee Shop" },
    address: {
      street: "5th Avenue",
      city: "New York",
      state: "NY",
      zip: "10011",
      country: "USA",
      houseNumber: 8,
    },
    bizNumber: 1234567,
  },
  {
    title: "Tech Repair",
    subtitle: "Fixing devices with care",
    description: "Fast and reliable tech repair services.",
    phone: "050-9998888",
    email: "repair@example.com",
    web: "https://tech-repair.com",
    image: { url: "https://example.com/repair.jpg", alt: "Tech Repair" },
    address: {
      street: "Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90028",
      country: "USA",
      houseNumber: 14,
    },
    bizNumber: 2345678,
  },
  {
    title: "Best Store Shop",
    subtitle: "Your daily Stocks",
    description: "We serve the best service in town!",
    phone: "050-5529741",
    email: "store@example.com",
    web: "https://store-shop.com",
    image: { url: "https://example.com/store.jpg", alt: "Store Shop" },
    address: {
      street: "8th Avenue",
      city: "miami",
      state: "miami",
      zip: "11645",
      country: "USA",
      houseNumber: 2,
    },
    bizNumber: 2546678,
  },
];

const seedDatabase = async () => {
  try {
    // Create initial users and store references
    const createdUsers = [];
    for (const user of users) {
      const newUser = await userService.create(user);
      createdUsers.push(newUser);
      console.log("Created user:", newUser.email);
    }

    // Map user_id to correct users
    const businessUser = createdUsers.find((u) => u.isBusiness);

    if (!businessUser) {
      throw new Error("No business user found. Cards require a business user.");
    }

    // Create initial cards with correct user_id
    for (const card of cards) {
      const newCard = new Card({
        ...card,
        user_id: businessUser._id, // Assign the business user
      });

      await newCard.save();
      console.log("Created card:", newCard.title);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const checkDatabaseInitialization = async () => {
  try {
    const userCount = await User.countDocuments();
    const cardCount = await Card.countDocuments();

    if (userCount === 0 || cardCount === 0) {
      console.log("Database is not initialized. Seeding data...");
      await seedDatabase();
    } else {
      console.log("Database is already initialized.");
    }
  } catch (error) {
    console.error("Error checking database initialization:", error);
  }
};

module.exports = { checkDatabaseInitialization, seedDatabase };
