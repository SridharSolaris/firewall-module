const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../../firewall.log");

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}

module.exports = log;
