const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
});

function connect() {
    con.connect((err) => {
        if (err) {
            console.log('ERROR CONNECTING TO DATABASE');
            throw err;
        } else {
            console.log('ChatJS database connection succssful!');
        }
    });
}

function get(req, res) {
    console.log('Retrieving user...');
    const sql = 'SELECT * FROM users WHERE id=' + req.body.id + ';';

    con.query(sql, (err, result) => {
        if (err) {
            console.log('ERROR GETTING USER');
        } else {
            console.log('Data retrieval successful!');
            res.send(result);
        }
    });
}

function save(req, res) {
    console.log('Saving ' + req.body.username + ' in the database...');
    const sql = "INSERT INTO users (username, password, firstname, lastname) VALUES ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.fistname + "', '" + req.body.lastname + "');";

    con.query(sql, (err) => {
        if (err) {
            console.log('ERROR SAVING USER');
        } else {
            console.log('Data insertion successfull!');
        }
    });
    res.redirect('/login');
}

module.exports = {
    connect: connect,
    get: get,
    save: save,
};
