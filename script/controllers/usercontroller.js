const mysql = require('mysql');
const CryptoJS = require('crypto-js');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
});

function authenticate(req, res) {
    const userCredentials = {
        username: req.body.username,
        password: CryptoJS.AES.decrypt(req.body.password, 'ChatJS Password').toString(CryptoJS.enc.Utf8),
    };
    console.log('User credentials:');
    console.log(userCredentials);
    console.log('Retrieving user...');
    console.log(req.body.username);
    const sql = 'SELECT * FROM users WHERE username = "' + userCredentials.username + '";';

    con.query(sql, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING USER');
            res.status(500);
            res.send(err.message);
        } else if (rows.length < 1) {
            console.log('User not found!');
            res.status(500);
            res.send('User not found!');
        } else {
            console.log('User retrieved!');
            console.log('Authenticating...');
            if (userCredentials.password === CryptoJS.AES.decrypt(rows[0].password, 'ChatJS Password').toString(CryptoJS.enc.Utf8)) {
                console.log('User authenticated!');
                const user = {
                    username: rows[0].username,
                    firstname: rows[0].firstname,
                    lastname: rows[0].lastname,
                };
                console.log(user);
                res.send(user);
            } else {
                console.log('Wrong password!');
                res.status(500);
                res.send('Wrong password!');
            }
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
    authenticate: authenticate,
    save: save,
};
