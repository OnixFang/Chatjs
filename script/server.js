// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "chatjs"
});

con.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('MySQL Database Succssful!');
    }
});

// Routes
app.get('/', function (req, res) {
    res.sendFile(appDir + 'index.html');
});

app.get('/getMessages', function (req, res) {
    console.log('Attempting to get data from database...');

    const sql = "SELECT content FROM message";
    con.query(sql, function (err, result) {
        if (err) {
            console.log("ERROR!");
            throw err;
        } else {
            console.log("Data retrieval successful!")
            res.send(result);
        }
    });
});

app.post('/', function (req, res) {
    console.log('Inserting ' + req.body.message + ' to the database...');

    const sql = "INSERT INTO message (content) VALUES ('" + req.body.message + "')";
    con.query(sql, function (err) {
        if (err) {
            console.log("ERROR!");
            throw err;
        } else {
            console.log('Data insertion successfull!');
        }
    });

    res.sendFile(appDir + 'index.html');
});

// Server launch
app.listen(port);
console.log('Listening on port:' + port);
