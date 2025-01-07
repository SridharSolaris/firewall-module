const https = require("https");
const axios = require("axios");
const logger = require("../utils/logger");
const RuleStore = require("../db/ruleStore");

class Firewall {
  static async checkAndProxy(req, res, next) {
    const clientIp = req.ip;
    logger.info(`Request from IP: ${clientIp}`);

    const blockedIps = await RuleStore.getBlockedIps();
    if (blockedIps.some((rule) => rule.ip === clientIp)) {
      logger.warn(`Blocked IP attempt: ${clientIp}`);
      return res
        .status(403)
        .json({ message: "Access Denied: Your IP is blocked" });
    }

    try {
      const targetUrl = process.env.CLIENT_WEB_APP_URL + req.originalUrl;
      console.log("Forwarding request to:", targetUrl);

      const response = await axios({
        method: req.method,
        url: targetUrl,
        headers: {
          ...req.headers,
          Host: process.env.CLIENT_WEB_APP_URL.replace(/^https?:\/\//, ""),
        },
        data: req.body,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Only for development
        }),
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
