require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");
const User = require("../models/User");
const Card = require("../models/Card");

const seedDatabase = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Card.deleteMany();

    console.log("Existing data cleared...");

    // Create initial users
    const users = [
      {
        name: { first: "Regular", last: "User" },
        phone: "050-1234567",
        email: "regular@example.com",
        password: await bcrypt.hash("Password1!", 10),
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
        password: await bcrypt.hash("Password1!", 10),
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
        password: await bcrypt.hash("AdminPass1!", 10),
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

    const createdUsers = await User.insertMany(users);
    console.log(
      "Users added:",
      createdUsers.map((u) => u.email)
    );

    // Create initial cards
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
        user_id: createdUsers[1]._id, // Business User
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
        user_id: createdUsers[1]._id, // Business User
      },
    ];

    await Card.insertMany(cards);
    console.log("Cards added!");

    // Disconnect from DB
    mongoose.connection.close();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
