const mongoose = require("mongoose");
const { checkDatabaseInitialization } = require("../scripts/initDB");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
    await checkDatabaseInitialization();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
