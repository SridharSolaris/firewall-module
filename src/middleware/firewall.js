const ruleManager = require("../services/ruleManager");

async function firewallMiddleware(req, res, next) {
  const clientIP = req.ip;

  try {
    const isBlocked = await ruleManager.isIPBlocked(clientIP);
    if (isBlocked) {
      res.status(403).send("Access Denied: Your IP is blocked.");
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in firewall middleware:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = firewallMiddleware;
