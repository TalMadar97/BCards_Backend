const cors = require("cors");

const origin = process.env.ORIGINS
  ? process.env.ORIGINS.split(",")
  : ["localhost:5173"];

const corsMiddleware = cors({
  origin,
});

module.exports = corsMiddleware;
