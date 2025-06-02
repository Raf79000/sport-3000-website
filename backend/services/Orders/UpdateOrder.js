module.exports = (app, db_connexion) => {
  app.put("/orders/:id", (req, res, next) => {
    const { userId, totalAmount, paymentMethod } = req.body;

    if (!userId || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: "All fields are required." });
    }

    db_connexion.query(
      `UPDATE orders
      SET user_id = ?, total_amount = ?, payment_method = ?
      WHERE id = ?`,
      [userId, totalAmount, paymentMethod, Number(req.params.id)],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({
          id: result.insertId,
          message: "Order created",
        });
      }
    );
  });
};
