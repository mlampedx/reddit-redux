const express = require('express');
const path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index'));
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
})

app.listen(3000, () => console.log('listening on port 3000'));
