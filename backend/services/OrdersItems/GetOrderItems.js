module.exports = (app, db_connexion) => {
  // GET /orders/:id/items
  app.get("/orders/:id/items", (req, res) => {
    const orderId = req.params.id;

    // Validate numeric ID
    if (isNaN(orderId)) {
      return res.status(400).json({ error: "Order ID must be a number" });
    }

    const query = `
      SELECT 
        i.name AS item_name,
        oi.quantity,
        oi.unit_price
      FROM ordersItems AS oi
      JOIN items AS i ON oi.item_id = i.id
      WHERE oi.order_id = ?
    `;

    db_connexion.query(query, [orderId], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      // If no items found, return empty array
      return res.json(results);
    });
  });
};
