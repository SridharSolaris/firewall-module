const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ruleManager = require("./services/ruleManager");
const firewall = require("./middleware/firewall");

dotenv.config();

const app = express();
app.use(express.json());
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(firewall); // Firewall middleware

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/block", async (req, res) => {
  const { ip } = req.body;
  await ruleManager.addRule(ip, "block");
  res.send({ message: `IP ${ip} blocked.` });
});

app.post("/unblock", async (req, res) => {
  const { ip } = req.body;
  await ruleManager.removeRule(ip);
  res.send({ message: `IP ${ip} unblocked.` });
});

app.get("/rules", async (req, res) => {
  const rules = await ruleManager.getRules();
  res.send(rules);
});

// New Route: Validate IP
app.post("/validate", async (req, res) => {
  const { ip } = req.body; // The client IP is passed in the request body
  try {
    const rule = await ruleManager.getRules(ip); // Check if the IP is blocked
    if (rule.some((r) => r.ip === ip && r.action === "block")) {
      return res.json({ blocked: true });
    }
    res.json({ blocked: false });
  } catch (error) {
    console.error("Error validating IP:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Firewall service running on port ${PORT}`));
