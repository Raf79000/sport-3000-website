const bcrypt = require("bcrypt");
const jwtHelper = require("./../../Util/jwtHelper");
const error = require("./../../Util/error");

module.exports = (app, db_connexion) => {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db_connexion.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (dbError, results) => {
        if (dbError) {
          console.error("Erreur recherche utilisateur dans BDD :", dbError);
          return error.InternalServer(res, "Erreur lors de l'authentification.");
        }

        if (results.length === 0) {
          return error.Unauthorized(res, "Identifiants incorrects.");
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            console.error("Erreur comparaison mot de passe :", err);
            return error.InternalServer(res, "Erreur serveur auth.");
          }

          if (!match) {
            return error.Unauthorized(res, "Identifiants faux.");
          }

          const token = jwtHelper.generateJwtToken(user.id, user.role, email);

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
};