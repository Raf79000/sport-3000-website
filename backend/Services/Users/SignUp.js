const bcrypt = require("bcrypt");
const error = require("error");
const jwtHelper = require("jwtHelper");

const db_connexion = require("./db_connexion");
require("dotenv").config();

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  db_connexion.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (checkError, existingUsers) => {
      if (checkError) {
        console.error("Erreur lors de la vérification du email :", checkError);
        return error.BadRequest(res, "Erreur serveur lors de la vérification");
      }

      if (existingUsers.length > 0) {
        return res.status(409).json({ error: "Email déjà utilisé." });
      }

      bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
          console.error("Erreur de hachage du mot de passe :", hashError);
          return res.status(500).json({ error: "Erreur serveur lors du hachage." });
        }

        const defaultRole = "user";

        db_connexion.query(
          "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)",
          [email, email, hash, defaultRole],
          (insertError, result) => {
            if (insertError) {
              console.error("Erreur insertion utilisateur :", insertError);
              return res.status(500).json({ error: "Erreur serveur lors de la création." });
            }

            const userId = result.insertId;
            const token = jwtHelper.generateJwtToken(userId, defaultRole);

            return res.status(201).json({
              message: "Utilisateur créé et connecté avec succès.",
              userId,
              role: defaultRole,
              token,
            });
          }
        );
      });
    }
  );
});