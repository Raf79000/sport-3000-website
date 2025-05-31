app.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Erreur lors du hachage du mot de passe :", err);
      return res
        .status(500)
        .json({ error: "Erreur serveur lors du hachage du mot de passe." });
    } else {
      db_connexion.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (error, results) => {
          if (error) {
            console.error(
              "Erreur lors de l'insertion de l'utilisateur :",
              error
            );
            return res.status(500).json({
              error: "Erreur serveur lors de l'insertion de l'utilisateur.",
            });
          } else {
            return res
              .status(201)
              .json({ message: "Utilisateur créé avec succès." });
          }
        }
      );
    }
  });
});
