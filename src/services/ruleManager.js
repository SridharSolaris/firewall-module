const Rule = require("../db/ruleStore");
const iptablesService = require("./iptablesService");

module.exports = {
  addRule: async (ip, action) => {
    const rule = new Rule({ ip, action });
    await rule.save();
    iptablesService.blockIP(ip);
  },
  removeRule: async (ip) => {
    await Rule.deleteOne({ ip });
    iptablesService.allowIP(ip);
  },
  getRules: async () => {
    return Rule.find();
  },
};
