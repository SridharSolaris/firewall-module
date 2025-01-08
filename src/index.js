const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ruleManager = require("./services/ruleManager");
const firewall = require("./middleware/firewall");

dotenv.config();

const app = express();
app.use(express.json());
app.use(firewall);
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

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

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Firewall service running on port ${PORT}`));
