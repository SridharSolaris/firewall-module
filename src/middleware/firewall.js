const RuleStore = require("../db/ruleStore");
const logger = require("../utils/logger");
const axios = require("axios");

class Firewall {
  /**
   * Middleware to check and block malicious IPs.
   * Forwards the request if the IP is not blocked.
   */

  static async checkAndProxy(req, res, next) {
    const clientIp = req.ip;
    logger.info(`Request from IP: ${clientIp}`);

    const blockedIps = await RuleStore.getBlockedIps();

    // Check if the IP is blocked
    if (blockedIps.some((rule) => rule.ip === clientIp)) {
      logger.warn(`Blocked IP attempt: ${clientIp}`);
      return res
        .status(403)
        .json({ message: "Access Denied: Your IP is blocked" });
    }

    // Forward the request to the target client web app
    try {
      const targetUrl = process.env.CLIENT_WEB_APP_URL + req.originalUrl;
      console.log("Forwarding request to:", targetUrl);
      const response = await axios({
        method: req.method,
        url: targetUrl,
        headers: req.headers,
        data: req.body,
      });

      res.status(response.status).send(response.data);
    } catch (err) {
      logger.error(`Error forwarding request: ${err.message}`);
      res.status(err.response?.status || 500).send({
        message: "Error forwarding the request to the client web app.",
      });
    }
  }
}

module.exports = Firewall;
