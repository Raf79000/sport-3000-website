const error = require("../../utils/error");

module.exports = (app, db_connexion) => {
  app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    db_connexion.query(
      "SELECT id, email, username, phone_number, address FROM users WHERE id = ?",
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