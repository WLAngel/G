const express = require('express');
const g = require('./routes/g');

const app = express();

app.get('/', (req, res) => {
  console.log('test');
  res.send('testing');
});

app.use('/g', g);

module.exports = app;
