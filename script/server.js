// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./controllers/chatjs-database.js');
const users = require('./controllers/usercontroller.js');

// Server variables
const rootPath = path.normalize(__dirname + './../');
const appDir = path.normalize(rootPath + '/app/');
const port = 80;
const app = express();

// Express app configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(appDir));

// MySQL Connection
database.connect();

// API
app.post('/authenticate', users.authenticate);
app.post('/user', users.save);

// Default Page
app.get('*', (req, res) => {
    res.sendFile(appDir + 'index.html');
});

// Server launch
app.listen(port);
console.log('Listening on port:' + port);
console.log('http://localhost:' + port);
