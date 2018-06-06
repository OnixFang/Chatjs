// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./controllers/chatjs-database.js');

// Server variables
const rootPath = path.normalize(__dirname + './../');
const appDir = path.normalize(rootPath + '/app/');
const port = 8012;
const app = express();

// Express app configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(appDir));

// MySQL Connection
database.connect();

// Routes
app.get('/', function (req, res) {
    res.sendFile(appDir + 'index.html');
});

app.get('/getMessages', database.getAllMessages);

app.post('/', database.saveMessage);

// Server launch
app.listen(port);
console.log('Listening on port:' + port);
