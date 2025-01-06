const exec = require("child_process").exec;

class IptablesService {
  static blockIp(ip) {
    return new Promise((resolve, reject) => {
      const command = `sudo iptables -A INPUT -s ${ip} -j DROP`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error blocking IP: ${stderr}`);
        } else {
          resolve(`IP ${ip} blocked successfully: ${stdout}`);
        }
      });
    });
  }

  static unblockIp(ip) {
    return new Promise((resolve, reject) => {
      const command = `sudo iptables -D INPUT -s ${ip} -j DROP`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error unblocking IP: ${stderr}`);
        } else {
          resolve(`IP ${ip} unblocked successfully: ${stdout}`);
        }
      });
    });
  }
}

module.exports = IptablesService;
