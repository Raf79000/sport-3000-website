module.exports = (app, db_connexion) => {
  app.delete("/user/:id", (req, res, next) => {
    const userId = req.params.id;
    const { password } = req.body;
    const hashedPasswordFromDB = results[0].password;
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
          res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        }
      }
    );
  });
};