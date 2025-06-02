module.exports = (app, db_connexion) => {
    app.delete("/items/:id", (req, res) => {
        db_connexion.query(
            "DELETE FROM items WHERE id = ?",
            [req.params.id],
            (err, result) => {
                if (err) return res.status(500).json(err);
                if (result.affectedRows === 0)
                    return res.status(404).json({ error: "Not found" });
                res.json({ message: "Item deleted" });
            }
        );
    });
};
