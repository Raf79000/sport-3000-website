app.get("/orders", (req, res, next) => {
  db_connexion.query("SELECT * FROM orders", (error, results) => {
    if (error) return res.status(500).json(error);
    const orders = results.map((order) => {
      return {
        id: order.id,
        userId: order.user_id,
        totalAmount: order.total_amount,
        paymentMethod: order.payment_method,
        createdAt: order.created_at,
        status: order.status,
      };
    });
    res.status(200).json(orders);
  });
});