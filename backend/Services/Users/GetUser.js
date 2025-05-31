app.get("/user/:id", (req, res, next) => {
  const userId = req.params.id;
  db_connexion.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :");
        res
          .status(500)
          .json({ error: "Erreur serveur lors de la récupération." });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});