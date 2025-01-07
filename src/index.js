require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const Firewall = require("./middleware/firewall");

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB:", err);
    console.error("Failed to connect to MongoDB:", err);
  });

// Test endpoint
app.get("/test", (req, res) => {
  res.status(200).send("Request was successful");
});

// Firewall Middleware to check and proxy requests
app.use(Firewall.checkAndProxy);

// Start the server only after MongoDB is connected
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    logger.info(`Firewall server is running on port ${port}`);
    console.log(`Firewall server running on port ${port}`);
  });
});
