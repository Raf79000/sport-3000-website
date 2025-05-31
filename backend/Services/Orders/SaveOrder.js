module.exports = (app, db_connexion) => {
  app.post("/orders", (req, res, next) => {
    console.log("Creating order with body:", req.body);
    const { customerId, totalAmount, paymentMethod } = req.body;

    db_connexion.query(
      `INSERT INTO orders
        (user_id, total_amount, payment_method)
       VALUES (?, ?, ?)`,
      [customerId, totalAmount, paymentMethod],
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