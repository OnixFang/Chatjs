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
    console.log('Retrieving user from database...');
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
    const sql = "INSERT INTO users (username, password, firstname, lastname) VALUES ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.firstname + "', '" + req.body.lastname + "');";

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

function getAll(req, res) {
    console.log('Getting all users...');
    const sql = 'SELECT username, firstname, lastname FROM users;';

    con.query(sql, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING USERS: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else {
            console.log('Users retrieved!');
            const users = [];
            for (let i = 0; i < rows.length; i += 1) {
                const user = {
                    username: rows[i].username,
                    firstname: rows[i].firstname,
                    lastname: rows[i].lastname,
                };
                users.push(user);
            }
            console.log(users);
            res.send(users);
        }
    });
}

module.exports = {
    authenticate: authenticate,
    save: save,
    getAll: getAll,
};
