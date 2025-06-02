module.exports = (app, db_connexion) => {
  // 3) DELETE /favorites/:userId/:itemId  → remove from favorites
  app.delete("/favorites/:userId/:itemId", (req, res) => {
    const userId = Number(req.params.userId);
    const itemId = Number(req.params.itemId);
    if (isNaN(userId) || isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid IDs" });
    }

    const query = `
    DELETE FROM user_favorites
    WHERE user_id = ? AND item_id = ?
  `;
    db_connexion.query(query, [userId, itemId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Favorite not found." });
      }
      return res.json({ message: "Removed from favorites." });
    });
  });
};
