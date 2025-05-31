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
