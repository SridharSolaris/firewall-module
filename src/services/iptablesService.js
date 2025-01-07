const { exec } = require("child_process");

function blockIP(ip) {
  exec(`iptables -A INPUT -s ${ip} -j DROP`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error blocking IP:", stderr);
    } else {
      console.log(`IP ${ip} blocked successfully.`);
    }
  });
}

function unblockIP(ip) {
  exec(`iptables -D INPUT -s ${ip} -j DROP`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error unblocking IP:", stderr);
    } else {
      console.log(`IP ${ip} unblocked successfully.`);
    }
  });
}

module.exports = { blockIP, unblockIP };
