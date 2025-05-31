app.put("/orders/:id", (req, res, next) => {
  const { orderId, userId, totalAmount, paymentMethod } = req.body;

  if (!orderId || !userId || !totalAmount || !paymentMethod) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db_connexion.query(
    `INSERT INTO orders
        (user_id, total_amount, payment_method)
       VALUES (?, ?, ?)
       WHERE id = ?`,
    [userId, totalAmount, paymentMethod, orderId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        message: "Order created",
      });
    }
  );
});