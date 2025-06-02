const jwtHelper = require("../../utils/jwtHelper");
const error = require("../../utils/error");

module.exports = (app, db_connexion) => {
  app.delete("/user/:id", (req, res, next) => {
    const userId = req.params.id;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
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
      "DELETE FROM users WHERE id = ?",
      [userId],
      (error, results) => {
        if (error) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
          res
            .status(500)
            .json({ error: "Erreur serveur lors de la suppression." });
        } else {
          res
            .status(200)
            .json({ message: "Utilisateur supprimé avec succès." });
        }
      }
    );
  });
};
