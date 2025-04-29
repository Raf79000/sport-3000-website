const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();

// On active bodyParser
app.use(bodyParser.json());
// On active CORS pour toutes les routes
app.use(cors());
// Définir le dossier contenant nos images comme dossier statique
app.use("/public/assets/images", express.static("public/assets/images"));

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
    const uploadDir = "./public/assets/images";
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}-
  ${file.originalname}`;
    callback(null, fileName);
  },
});
const upload = multer({ storage: storage });

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
      this.connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (error, results) => {
          if (error) {
            console.error(
              "Erreur lors de l'insertion de l'utilisateur :",
              error
            );
            return res
              .status(500)
              .json({
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

app.get("/:id", (req, res, next) => {
  const itemId = req.params.id;
  connection.query(
    "SELECT * FROM items WHERE id = ?",
    [itemId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête SELECT :", error);
        res
          .status(500)
          .json({ error: "Erreur serveur lors de la requête SELECT." });
      } else {
        if (results.length > 0) {
          // Si des résultats sont trouvés, renvoyer le 1er élément (le vêtement trouvé)
          res.status(200).json(results[0]);
        } else {
          // Si aucun résultat trouvé, renvoyer une réponse 404
          res.status(404).json({ error: "Aucun vêtement trouvé avec cet ID." });
        }
      }
    }
  );
});

//on modifie un seul article en fonction de son id
app.put("/:id", (req, res, next) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;
  connection.query(
    "UPDATE items SET ? WHERE id = ?",
    [updatedItemData, itemId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête UPDATE :", error);
        res
          .status(500)
          .json({ error: "Erreur serveur lors de la requête UPDATE." });
      } else {
        if (results.affectedRows > 0) {
          // Renvoie les données mises à jour
          res.status(200).json(updatedItemData);
        } else {
          res.status(404).json({ error: "Aucun vêtement trouvé avec cet ID." });
        }
      }
    }
  );
});

module.exports = app;
