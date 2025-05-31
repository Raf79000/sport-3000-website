const jwtHelper = require("./../../Util/jwtHelper");
const error = require("./../../Util/error");

module.exports = (app, db_connexion) => {
  app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("prout");
      return error.Unauthorized(res, "Token manquant.");
    }

    const token = authHeader.split(" ")[1];
    let payload;

    try {
      payload = jwtHelper.verifyJwtToken(token);
    } catch (err) {
      console.error("Erreur de vérification du token :", err);
      return error.Unauthorized(res, "Token invalide.");
    }

    if (parseInt(payload.userId) !== parseInt(userId)) {
      return error.Forbidden(res, "Accès refusé à cet utilisateur.");
    }

    db_connexion.query(
      "SELECT id, email, username, phone, address FROM users WHERE id = ?",
      [userId],
      (errorDb, results) => {
        if (errorDb) {
          console.error("Erreur lors de la récupération de l'utilisateur :", errorDb);
          return error.InternalServer(res, "Erreur serveur lors de la récupération.");
        }

        if (results.length === 0) {
          return error.NotFound(res, "Utilisateur non trouvé.");
        }

        return res.status(200).json(results[0]);
      }
    );
  });
};