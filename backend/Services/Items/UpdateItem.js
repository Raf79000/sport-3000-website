module.exports = (app, db_connexion, multerStorage) => {
  app.put(
    "/items/:id",
    multerStorage.single("cover"), // ← also allow new cover
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
};