const fs = require("fs");
const path = require("path");

const logError = (err, req, res, next) => {
  console.log("🔴 logError middleware triggered!");
  console.log("➡️ Request Path:", req.originalUrl);
  console.log("➡️ Error Message:", err.message);
  console.log("➡️ Response Status:", res.statusCode);

  const logDirectory = path.join(__dirname, "../logs");

  if (!fs.existsSync(logDirectory)) {
    console.log("⚠️ Creating logs directory...");
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  const logFile = path.join(
    logDirectory,
    `${new Date().toISOString().split("T")[0]}.log`
  );
  console.log("📝 Log File Path:", logFile);

  const logEntry = `${new Date().toISOString()} | ${req.method} ${
    req.originalUrl
  } | Status: ${res.statusCode} | Error: ${err.message}\n`;

  console.log("📝 Log Entry:", logEntry);

  try {
    fs.appendFileSync(logFile, logEntry);
    console.log("✅ Log entry written successfully!");
  } catch (fileErr) {
    console.error("❌ ERROR WRITING LOG FILE:", fileErr);
  }

  next(err);
};

module.exports = logError;
