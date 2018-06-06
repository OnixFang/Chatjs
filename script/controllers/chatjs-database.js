//This is the master brach

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "chatjs"
});

function connect() {
    con.connect(function (err) {
        if (err) {
            throw err;
        } else {
            console.log('MySQL ChatJS Database Succssful!');
        }
    });
}

function endConnection() {
    con.end();
}

function getAllMessages(req, res) {
    const sql = "SELECT content FROM message";
    console.log("Retrieving all messages...");

    connect();
    con.query(sql, function (err, result) {
        if (err) {
            console.log("ERROR!");
            throw err;
        } else {
            console.log("Data retrieval successful!")
            res.send(result);
        }
    });
    endConnection();
}

function saveMessage(req, res) {
    const sql = "INSERT INTO message (content) VALUES ('" + req.body.message + "')";
    console.log('Inserting ' + req.body.message + ' to the database...');

    connect();
    con.query(sql, function (err) {
        if (err) {
            console.log("ERROR!");
            throw err;
        } else {
            console.log('Data insertion successfull!');
        }
    });
    res.sendFile(appDir + 'index.html');
    endConnection();
}

module.exports = {
    getAllMessages: getAllMessages,
    saveMessage: saveMessage,
}