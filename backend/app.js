const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use((req, res) =>{
  res.json({
    message: 'Hello World!'
  })
});

module.exports = app;