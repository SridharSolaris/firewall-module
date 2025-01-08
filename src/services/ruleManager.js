const Rule = require("../db/ruleStore");

module.exports = {
  addRule: async (ip, action) => {
    const rule = new Rule({ ip, action });
    await rule.save();
    console.log(`Rule added for IP ${ip} with action ${action}`);
  },
  removeRule: async (ip) => {
    await Rule.deleteOne({ ip });
    console.log(`Rule removed for IP ${ip}`);
  },
  getRules: async () => {
    return Rule.find();
  },
};
