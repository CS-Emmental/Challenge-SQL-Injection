'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.disable('etag');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  db.all(`SELECT * FROM users WHERE login='${login}' AND password='${password}'`, (err, rows) => {
    if (rows.length > 0) {
      console.log("ok1");
      req.session.loggedin = true;
      req.session.login = login;
      res.redirect('/home');
    } else {
      res.send('Incorrect Login and/or Password!');
    }			
    res.end();
  });
});

app.get('/home', (req, res) => {
  console.log("ok2");
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname + '/secret.html'));
    console.log(req.session.login);
	} else {
    res.send('Please login to view this page!');
    res.end();
	}
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);