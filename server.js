'use strict';

const express = require('express');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("users.sqlite");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.disable('etag');

app.get('/', (req, res) => {
  let returnString = "";
  db.each("SELECT * FROM users", (err, row) => {
    returnString += row.login;
  });
  res.send(returnString);
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);