const RuleStore = require("../db/ruleStore");
const Firewall = require("../middleware/firewall");

class RuleManager {
  static async manageBlockedIp(ip, action) {
    switch (action) {
      case "block":
        await Firewall.blockIp(ip);
        break;
      case "unblock":
        await Firewall.unblockIp(ip);
        break;
      default:
        throw new Error("Invalid action");
    }
  }
}

module.exports = RuleManager;
