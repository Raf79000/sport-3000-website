module.exports = (app, db_connexion) => {
  // 1) GET /favorites/:userId  → list item_ids (and optionally item details) in this user’s favorites
  app.get("/favorites/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const query = `
      SELECT i.id, i.name, i.price, i.cover, i.onSale, i.salesPrice
      FROM user_favorites uf
      JOIN items i ON uf.item_id = i.id
      WHERE uf.user_id = ?
      ORDER BY uf.created_at DESC
    `;
    db_connexion.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json(err);
      const host = "http://localhost:3000";
      const items = results.map((item) => ({
        ...item,
        cover: item.cover ? `${host}/images/${item.cover}` : null,
      }));
      return res.status(200).json(items);
    });
  });
};