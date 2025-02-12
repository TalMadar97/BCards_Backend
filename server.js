const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes"); 

const connectDB = require("./config/db");
const { loggerMiddleware } = require("./loggers/loggerService");
const corsMiddleware = require("./middlewares/cors");

// Connect To Database
connectDB();

// Middleware
app.use(express.json());
app.use(corsMiddleware);
app.use(loggerMiddleware());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
