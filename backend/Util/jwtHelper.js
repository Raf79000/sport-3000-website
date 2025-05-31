const jwt = require("jsonwebtoken");
const jwtHelper = {};

jwtHelper.generateJwtToken = function(userId, role = 2) {
  const secret = process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET";
  const expiresIn = "24h";
  const payload = { userId, role };
  return jwt.sign(payload, secret, { expiresIn });
}

module.exports = jwtHelper;
