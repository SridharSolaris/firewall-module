const mongoose = require("mongoose");

// Define the schema for a firewall rule
const firewallRuleSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
    match: [/^(\d{1,3}\.){3}\d{1,3}$/, "Please provide a valid IP address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const FirewallRule = mongoose.model("FirewallRule", firewallRuleSchema);

module.exports = FirewallRule;
