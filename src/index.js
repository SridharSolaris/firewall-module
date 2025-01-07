const express = require("express");
const cors = require("cors"); // Import CORS
const firewallMiddleware = require("./middleware/firewall");
const ruleManager = require("./services/ruleManager");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with default options
app.use(cors());

// Allow JSON requests
app.use(express.json());

// Middleware to check IPs
app.use(firewallMiddleware);

// Add IP block rule
app.post("/block", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).send("IP address is required.");

  try {
    await ruleManager.addRule(ip);
    res.status(200).send(`IP ${ip} blocked successfully.`);
  } catch (error) {
    console.error("Error blocking IP:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Remove IP block rule
app.post("/unblock", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).send("IP address is required.");

  try {
    await ruleManager.removeRule(ip);
    res.status(200).send(`IP ${ip} unblocked successfully.`);
  } catch (error) {
    console.error("Error unblocking IP:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Firewall service running on port ${PORT}`);
});
