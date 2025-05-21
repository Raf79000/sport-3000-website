const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

// On active bodyParser
app.use(bodyParser.json());
// On active CORS pour toutes les routes
app.use(cors());
// Définir le dossier contenant nos images comme dossier statique
app.use("/images", express.static("images"));

// Connexion to DB
const db_connexion = mysql.createConnection({
  host: "mariadb",
  user: "user",
  password: "eseo",
  database: "sport_3000",
  port: 3306,
});

db_connexion.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
  } else {
    console.log("Connexion à MySQL réussie !");
  }
});

// Binding images storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = "./images";
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}-
  ${file.originalname}`;
    callback(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res, next) => {
  db_connexion.query("SELECT * FROM items", (error, results) => {
    if (error) {
      console.error("Wsh frérot erreur sur ta query: ", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a user
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

app.pos

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
        res
          .status(200)
          .json({ message: "Utilisateur supprimé avec succès." });
      }
    }
  );
});

module.exports = app;
