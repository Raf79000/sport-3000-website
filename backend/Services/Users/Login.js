app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  // Récupérer le mot de passe haché de l'utilisateur depuis la BDD
  db_connexion.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Erreur recherche utilisateur dans BDD :", error);
        res.status(500).json({ error: "Erreur lors authentification." });
      } else {
        if (results.length > 0) {
          const hashedPasswordFromDB = results[0].password;
          // Comparer le mot de passe fourni avec le mot de passe haché
          bcrypt.compare(
            password,
            hashedPasswordFromDB,
            (compareError, match) => {
              if (compareError) {
                console.error("Error comparaison mdp :", compareError);
                res.status(500).json({ error: "Erreur serveur auth." });
              } else {
                if (match) {
                  const userId = results[0].id; // colonne contenant ID utilisateur
                  const token = jwt.sign({ userId }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                  });
                  res.status(200).json({
                    message: "Auth réussie.",
                    userId: userId,
                    token: token,
                  });
                } else {
                  res.status(401).json({ error: "Identifiants faux." });
                }
              }
            }
          );
        } else {
          res.status(401).json({ error: "Identifiants incorrects." });
        }
      }
    }
  );
});
