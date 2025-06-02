module.exports = (app, db_connexion) => {
  // 2) POST /favorites  → add { userId, itemId } to favorites
  app.post("/favorites", (req, res) => {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId and itemId are required." });
    }

    const query = `
    INSERT INTO user_favorites (user_id, item_id)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP()
  `;
    db_connexion.query(query, [userId, itemId], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ message: "Added to favorites." });
    });
  });
};
