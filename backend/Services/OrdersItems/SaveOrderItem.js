app.post("/orders/:id/:item", (req, res, next) => {
  const { quantity, price } = req.body;
  console.log('creating item with data:', quantity, price, req.params.id, req.params.item);

  if (!req.params.id || !req.params.item || !quantity || !price) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db_connexion.query(
    `INSERT INTO ordersItems
        (order_id, item_id, quantity, unit_price)
       VALUES (?, ?, ?, ?)`,
    [req.params.id, req.params.item, quantity, price],
    (err, result) => {      
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        message: "Order item created",
      });
    }
  );
});