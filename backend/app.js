const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

const db_connexion = mysql.createConnection({
  host: "mariadb",
  user: "user",
  password: "eseo",
  database: "sport_3000",
});

db_connexion.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
  } else {
    console.log("Connexion à MySQL réussie !");
  }
});

app.use(cors());

app.use((req, res) => {
  res.json({
    message: "Hello World!",
  });
});

module.exports = app;
