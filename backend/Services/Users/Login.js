app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db_connexion.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Erreur recherche utilisateur dans BDD :", error);
        return res.status(500).json({ error: "Erreur lors de l'authentification." });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Identifiants incorrects." });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error("Erreur comparaison mot de passe :", err);
          return res.status(500).json({ error: "Erreur serveur auth." });
        }

        if (!match) {
          return res.status(401).json({ error: "Identifiants faux." });
        }
        
        const token = util.generateJwtToken(user.id, user.role);

        return res.status(200).json({
          message: "Authentification réussie.",
          userId: user.id,
          role: user.role,
          token: token,
        });
      });
    }
  );
});