const mysql = require('mysql');

//--start-- connection to the mysql database
const dbPool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database : 'dev_bookstore'
})
// pool.getConnection((err, con) => { con.release(); console.log('mysql database connected') })

module.exports = dbPool;