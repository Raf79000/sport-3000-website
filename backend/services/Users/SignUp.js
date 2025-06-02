const bcrypt = require("bcrypt");
const jwtHelper = require("../../utils/jwtHelper");
const error = require("../../utils/error");

module.exports = (app, db_connexion) => {
  app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return error.BadRequest(res, "Email and password are required.");
    }

    db_connexion.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      (checkError, existingUsers) => {
        if (checkError) {
          console.error("Erreur lors de la vérification du email :", checkError);
          return error.InternalServer(res, "Erreur serveur lors de la vérification");
        }

        if (existingUsers.length > 0) {
          return error.Conflict(res, "Email déjà utilisé.");
        }

        bcrypt.hash(password, 10, (hashError, hash) => {
          if (hashError) {
            console.error("Erreur de hachage du mot de passe :", hashError);
            return error.InternalServer(res, "Erreur serveur lors du hachage.");
          }

          const defaultRole = 2; // Role par défaut pour les nouveaux utilisateurs

          db_connexion.query(
            "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)",
            [email, email, hash, defaultRole],
            (insertError, result) => {
              if (insertError) {
                console.error("Erreur insertion utilisateur :", insertError);
                return error.InternalServer(res, "Erreur serveur lors de la création.");
              }

              const userId = result.insertId;
              const token = jwtHelper.generateJwtToken(userId, defaultRole, email);

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
};