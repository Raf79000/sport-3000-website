module.exports = (app, db_connexion, multerStorage) => {
  app.post(
    "/items",
    multerStorage.single("cover"), // ← multer middleware
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
};