const Rule = require("../db/ruleStore");

async function firewall(req, res, next) {
  const clientIP = req.ip; // Get client IP

  try {
    const rule = await Rule.findOne({ ip: clientIP });
    if (rule && rule.action === "block") {
      return res.status(403).send({ message: "Access denied." });
    }
    next();
  } catch (error) {
    console.error("Error in firewall middleware:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = firewall;
