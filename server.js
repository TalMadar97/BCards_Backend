const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");

const logError = require("./middlewares/logError");
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


app.get("/force-error", (req, res, next) => {
  next(new Error("Forced Test Error!"));
});


app.use((err, req, res, next) => {
  console.log("🚨 Catch-All Error Middleware Triggered!");
  logError(err, req, res, next);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
