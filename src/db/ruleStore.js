const mongoose = require("mongoose");
const FirewallRule = require("./firewallRule"); // Assuming you have a FirewallRule model

class RuleStore {
  static async addRule(ip) {
    const newRule = new FirewallRule({ ip });
    return newRule.save();
  }

  static async getBlockedIps() {
    return FirewallRule.find({});
  }

  static async removeRule(ip) {
    return FirewallRule.deleteOne({ ip });
  }
}

module.exports = RuleStore;
