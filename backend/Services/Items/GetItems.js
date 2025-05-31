app.get("/", (req, res, next) => {
  db_connexion.query("SELECT * FROM items", (error, results) => {
    if (error) return res.status(500).json(error);
    // build a full URL for each cover
    const host = "http://localhost:3000";
    const items = results.map((item) => ({
      ...item,
      cover: item.cover ? `${host}/images/${item.cover}` : null,
    }));
    res.status(200).json(items);
  });
});