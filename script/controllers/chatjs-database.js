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
            console.log('ChatJS database connection succssful!');
        }
    });
}

function endConnection() {
    con.end();
}

function getAllMessages(req, res) {
    console.log("Retrieving all messages...");
    const sql = "SELECT * FROM messages;";

    con.query(sql, function (err, result) {
        if (err) {
            console.log("ERROR GETTING MESSAGES!");
            throw err;
        } else {
            console.log("Data retrieval successful!")
            res.send(result);
        }
    });
}

function saveMessage(req, res) {
    console.log('Inserting ' + req.body.message + ' to the database...');
    const sql = "INSERT INTO message (author, content) VALUES ('" + req.body.author + "', '" + req.body.content + "')";

    con.query(sql, function (err) {
        if (err) {
            console.log("ERROR SAVING MESSAGE!");
            throw err;
        } else {
            console.log('Data insertion successfull!');
        }
    });
    res.redirect('/');
}

module.exports = {
    connect: connect,
    getAllMessages: getAllMessages,
    saveMessage: saveMessage,
}