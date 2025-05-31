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