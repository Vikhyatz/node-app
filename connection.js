const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing",
    connectionLimit: "10"
})

module.exports = con;

// con.query(`insert into just_testin (name, ip_address) values("avlokita", 2342523)`, (err, result, fields) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log(result);
// })