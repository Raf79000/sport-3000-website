const jwt = require("jsonwebtoken");
const jwtHelper = {};

jwtHelper.generateJwtToken = function(userId, role = 2, email = null) {
  const secret = process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET";
  const expiresIn = "24h";
  const payload = { userId, role };
  if (email) payload.email = email;
  return jwt.sign(payload, secret, { expiresIn });
};

jwtHelper.verifyJwtToken = function(token) {
  const secret = process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET";
  return jwt.verify(token, secret);
};

module.exports = jwtHelper;
