const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

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

app.use(cors());

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

module.exports = app;
