const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const bodyParser = require("body-parser");
const initRoutes = require("./index");

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
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});
const multerStorage = multer({ storage: storage });

initRoutes(app, db_connexion, multerStorage);


module.exports = app;
