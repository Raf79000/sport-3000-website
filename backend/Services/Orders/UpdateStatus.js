app.patch("/orders/:id/status", (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  db_connexion.query(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      res.json({ message: "Order updated" });
    }
  );
});