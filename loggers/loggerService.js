const morganLogger = require("./morganLogger");
const config = require("config");

const logger = config.get("LOGGER");

const loggerMiddleware = () => {
  if (logger === "morgan") {
    return morganLogger;
  }
};

module.exports = { loggerMiddleware };
