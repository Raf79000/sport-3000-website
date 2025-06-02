const jwtHelper = require("../../utils/jwtHelper");
const error = require("../../utils/error");

module.exports = (app, db_connexion) => {
  app.put("/user/:id", (req, res) => {
    const userId = req.params.id;
    const { username, email, phone, address } = req.body;
    const authHeader = req.headers.authorization;

    try {
        jwtHelper.RunSecurityCheck(req.headers.authorization, userId);
    }
    catch (err) {
        return error.Unauthorized(res, err.message);
    }
    
    if (!username || !email || !phone || !address) {
      return error.BadRequest(res, "Tous les champs sont requis.");
    }

    db_connexion.query(
      "UPDATE users SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [username, email, phone, address, userId],
      (errorDb, result) => {
        if (errorDb) {
          console.error("Erreur lors de la mise à jour de l'utilisateur :", errorDb);
          return error.InternalServer(res, "Erreur serveur lors de la mise à jour.");
        }

        if (result.affectedRows === 0) {
          return error.NotFound(res, "Utilisateur non trouvé.");
        }

        return res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
      }
    );
  });
};