const mongoose = require("mongoose");

// Rule schema for MongoDB
const ruleSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  action: { type: String, enum: ["block", "allow"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = Rule;
