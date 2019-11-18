'use strict';

const express = require('express');
var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.disable('etag');

db.serialize(() => {
  db.each("SELECT * FROM users", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.login);
  });
});

app.get('/', (req, res) => {
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);