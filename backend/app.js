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
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res, next) => {
  db_connexion.query("SELECT * FROM items", (error, results) => {
    if (error) return res.status(500).json(error);
    // build a full URL for each cover
    const host = "http://localhost:3000";
    const items = results.map((item) => ({
      ...item,
      cover: item.cover ? `${host}/images/${item.cover}` : null,
    }));
    res.status(200).json(items);
  });
});

app.get("/items/:id", (req, res) => {
  db_connexion.query(
    "SELECT * FROM items WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ error: "Not found" });
      const item = results[0];
      const host = "http://localhost:3000";
      item.cover = item.cover ? `${host}/images/${item.cover}` : null;
      res.json(item);
    }
  );
});

// → Create a new item (admin only)
app.post(
  "/items",
  upload.single("cover"), // ← multer middleware
  (req, res) => {
    const { name, price, description, onSale, salesPrice } = req.body;
    // Multer puts the file info on req.file
    const coverFilename = req.file ? req.file.filename : null;

    db_connexion.query(
      `INSERT INTO items
          (name, price, cover, description, onSale, salesPrice)
         VALUES (?, ?, ?, ?, ?, ?)`,
      [name, price, coverFilename, description, onSale, salesPrice],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({
          id: result.insertId,
          coverUrl: coverFilename ? `/images/${coverFilename}` : null,
          message: "Item created",
        });
      }
    );
  }
);

// → Update an existing item (admin only)
app.put(
  "/items/:id",
  upload.single("cover"), // ← also allow new cover
  (req, res) => {
    const { name, price, description, onSale, salesPrice } = req.body;
    // If a new file was uploaded, use its filename; otherwise keep existing
    let coverFilename;
    if (req.file) {
      coverFilename = req.file.filename;
    }

    // First optionally fetch existing cover if needed
    db_connexion.query(
      "SELECT cover FROM items WHERE id = ?",
      [req.params.id],
      (selErr, selRes) => {
        if (selErr) return res.status(500).json(selErr);
        if (selRes.length === 0)
          return res.status(404).json({ error: "Not found" });

        const finalCover = coverFilename || selRes[0].cover;

        db_connexion.query(
          `UPDATE items SET
               name = ?, price = ?, cover = ?, description = ?, onSale = ?, salesPrice = ?
             WHERE id = ?`,
          [
            name,
            price,
            finalCover,
            description,
            onSale,
            salesPrice,
            req.params.id,
          ],
          (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
              message: "Item updated",
              coverUrl: `/images/${finalCover}`,
            });
          }
        );
      }
    );
  }
);

// → Delete an item (admin only)
app.delete("/items/:id", (req, res, next) => {
  db_connexion.query(
    "DELETE FROM items WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      res.json({ message: "Item deleted" });
    }
  );
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
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
      }
    }
  );
});

app.get("/orders", (req, res, next) => {
  db_connexion.query("SELECT * FROM orders", (error, results) => {
    if (error) return res.status(500).json(error);
    const orders = results.map((order) => {
      return {
        id: order.id,
        userId: order.user_id,
        totalAmount: order.total_amount,
        paymentMethod: order.payment_method,
        createdAt: order.created_at,
        status: order.status,
      };
    });
    res.status(200).json(orders);
  });
});

app.get("/orders/:id", (req, res) => {
  db_connexion.query(
    "SELECT * FROM orders WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ error: "Not found" });
      const order = results[0];
      res.json(order);
    }
  );
});

app.put("/orders/:id", (req, res, next) => {
  const { orderId, userId, totalAmount, paymentMethod } = req.body;

  if (!orderId || !userId || !totalAmount || !paymentMethod) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db_connexion.query(
    `INSERT INTO orders
        (user_id, total_amount, payment_method)
       VALUES (?, ?, ?)
       WHERE id = ?`,
    [userId, totalAmount, paymentMethod, orderId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        message: "Order created",
      });
    }
  );
});

app.post("/orders", (req, res, next) => {
  console.log("Creating order with body:", req.body);
  const { customerId, totalAmount, paymentMethod } = req.body;

  db_connexion.query(
    `INSERT INTO orders
        (user_id, total_amount, payment_method)
       VALUES (?, ?, ?)`,
    [customerId, totalAmount, paymentMethod],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        message: "Order created",
      });
    }
  );
});

module.exports = app;


