const mysql = require('mysql');
const CryptoJS = require('crypto-js');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
});

function passwordReset(req, res) {
    const userCredentials = {
        username: req.body.username,
        password: req.body.password,
        passcode: req.body.passcode,
    };
    console.log('Retrieving user from database...');
    console.log(req.body.username);
    const sql = 'SELECT * FROM users WHERE username = "' + userCredentials.username + '";';
    const sql2 = 'UPDATE users SET password = "'
        + userCredentials.password + '" WHERE username = "' + userCredentials.username + '";';

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
            console.log('Authenticating pass code...');
            if (userCredentials.passcode === rows[0].passcode) {
                console.log('Pass code authenticated!');
                con.query(sql2, (err2) => {
                    if (err2) {
                        console.log('ERROR UPDATING PASSWORD: ' + err2.message);
                        res.status(500);
                        res.send(err2.message);
                    } else {
                        console.log('Password update successfull!');
                        res.status(200);
                        res.send('Password updated!');
                    }
                });
            } else {
                console.log('Wrong pass code!');
                res.status(500);
                res.send('Wrong pass code!');
            }
        }
    });
}

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
            if (userCredentials.password === CryptoJS.AES.decrypt(rows[0].password, 'ChatJS Password')
                .toString(CryptoJS.enc.Utf8)) {
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

function saveUser(req, res) {
    console.log('Saving ' + req.body.username + ' in the database...');
    const sql = "INSERT INTO users (username, password, firstname, lastname, passcode) VALUES ('"
        + req.body.username + "', '" + req.body.password + "', '" + req.body.firstname + "', '"
        + req.body.lastname + "', '" + req.body.passcode + "');";

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

function getUser(req, res) {
    console.log('Getting user...');
    const sql = 'SELECT username, firstname, lastname FROM users WHERE username="' + req.body.username + '";';

    con.query(sql, (err, rows) => {
        if (err) {
            console.log('ERROR GETTING USER: ' + err.message);
            res.status(500);
            res.send(err.message);
        } else if (rows.length < 1) {
            console.log('No user found!');
            res.status(500);
            res.send('No user found!');
        } else {
            console.log('User retrieved!');
            const user = {
                username: rows[0].username,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
            };
            res.send(user);
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
            res.send(users);
        }
    });
}

module.exports = {
    authenticate: authenticate,
    passwordReset: passwordReset,
    saveUser: saveUser,
    getUser: getUser,
    getAll: getAll,
};
