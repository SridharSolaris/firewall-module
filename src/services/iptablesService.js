// No longer necessary for the Render.com environment, retained for local use
function blockIP(ip) {
  console.log(`Blocking IP: ${ip}`);
}

function allowIP(ip) {
  console.log(`Allowing IP: ${ip}`);
}

module.exports = { blockIP, allowIP };
