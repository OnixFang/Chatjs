const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
});

function get(req, res) {
    console.log('Retrieving user...');
    console.log(req.body);
    const sql = 'SELECT * FROM users WHERE username = "' + req.params.username + '";';

    con.query(sql, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING USER');
            res.status(500);
            res.send(err.message);
        } else {
            console.log('Data retrieval successful!');
            res.send(rows);
        }
    });
}

function save(req, res) {
    console.log('Saving ' + req.body.username + ' in the database...');
    const sql = "INSERT INTO users (username, password, firstname, lastname) VALUES ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.fistname + "', '" + req.body.lastname + "');";

    con.query(sql, (err) => {
        if (err) {
            console.log('ERROR SAVING USER: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else {
            console.log('Data insertion successfull!');
            res.send();
        }
    });
}

module.exports = {
    get: get,
    save: save,
};
