const connectDB = require("../db/ruleStore");
const iptablesService = require("./iptablesService");

async function addRule(ip) {
  const db = await connectDB();
  await db.insertOne({ ip, blocked: true });
  iptablesService.blockIP(ip);
}

async function removeRule(ip) {
  const db = await connectDB();
  await db.deleteOne({ ip });
  iptablesService.unblockIP(ip);
}

async function isIPBlocked(ip) {
  const db = await connectDB();
  const rule = await db.findOne({ ip, blocked: true });
  return !!rule;
}

module.exports = { addRule, removeRule, isIPBlocked };
