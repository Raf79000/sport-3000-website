const error = require("../../utils/error");

module.exports = (app, db_connexion) => {
  app.put("/user/:id", (req, res) => {
    const userId = req.params.id;
    const { username, email, phone_number, address } = req.body;
    
    if (!username || !email) {
      return error.BadRequest(res, "Le nom d'utilisateur et l'e-mail sont requis.");
    }

    db_connexion.query(
      "UPDATE users SET username = ?, email = ?, phone_number = ?, address = ? WHERE id = ?",
      [username, email, phone_number, address, userId],
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