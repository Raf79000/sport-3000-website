const jwt = require("jsonwebtoken");
const { Unauthorized } = require("./error");
const jwtHelper = {};

jwtHelper.generateJwtToken = function(userId, role = 2, email = null) {
  const secret = process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET";
  const expiresIn = "24h";
  const payload = { userId, role };
  if (email) payload.email = email;
  return jwt.sign(payload, secret, { expiresIn });
};

jwtHelper.RunSecurityCheck = function(authHeader, userId){
  if (!authHeader) {
        return error.Unauthorized(res, "Token manquant.");
      }

      const token = authHeader.split(" ")[1];
      let payload;
      try {
        payload = jwtHelper.verifyJwtToken(token);
      } catch (err) {
        throw new Error("Token invalide.");
      }
  
      if (payload.userId !== parseInt(userId)) {
        throw new Error("Accès refusé à cet utilisateur.");
      }
  return;
};

jwtHelper.verifyJwtToken = function(token) {
  const secret = process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET";
  return jwt.verify(token, secret);
};

module.exports = jwtHelper;
