const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
});

function saveMessage(req, res) {
    console.log('Saving message...');
    const sql = "INSERT INTO messages (body, transmitter_username, receptor_username) VALUES ('"
        + req.body.body + "', '" + req.body.fromUsername + "', '" + req.body.toUsername + "');";

    con.query(sql, (err) => {
        if (err) {
            console.log('ERROR SAVING MESSAGE: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else {
            console.log('Message saved successfully.');
            res.send();
        }
    });
}

function getConversationMessages(req, res) {
    console.log('Getting conversation messages...');
    const sqlFromMeMessages = 'SELECT transmitter_username, body, datesent FROM messages WHERE transmitter_username="'
        + req.body.fromUsername + '" AND receptor_username ="' + req.body.toUsername + '";';
    const sqlToMessages = 'SELECT transmitter_username, body, datesent FROM messages WHERE transmitter_username="'
        + req.body.toUsername + '" AND receptor_username ="' + req.body.fromUsername + '";';
    const messages = [];

    // Get messages where the user is the transmitter
    con.query(sqlFromMeMessages, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING FROM ME MESSAGES: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else if (rows.length < 1) {
            console.log('No FromMe messages.');
        } else {
            console.log('FromMe messages retrieved!');
            for (let i = 0; i < rows.length; i += 1) {
                console.log('pushing message');
                const message = {
                    username: rows[i].transmitter_username,
                    body: rows[i].body,
                    datesent: rows[i].datesent,
                };
                messages.push(message);
            }
        }
    });

    // Get messages where the user is the receptor
    con.query(sqlToMessages, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING TO ME MESSAGES: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else if (rows.length < 1) {
            console.log('No ToMe messages. Sending messages.');
            res.send(messages);
        } else {
            console.log('ToMe messages retrieved!');
            for (let i = 0; i < rows.length; i += 1) {
                const message = {
                    username: rows[i].transmitter_username,
                    body: rows[i].body,
                    datesent: rows[i].datesent,
                };
                messages.push(message);
            }
            console.log('Sending messages.');
            res.send(messages);
        }
    });
}

module.exports = {
    saveMessage: saveMessage,
    getConversationMessages: getConversationMessages,
};
