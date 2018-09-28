const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatjs',
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

module.exports = {
    connect: connect,
};
