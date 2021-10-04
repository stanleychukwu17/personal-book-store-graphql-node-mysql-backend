const mysql = require('mysql2/promise');

const getAllBooks = async (bookId = 0) => {
    const arguments = [];
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'password', database: 'dev_bookstore'});
    const [rows, fields] = await connection.execute('SELECT * FROM books', arguments);

    return rows;
}

module.exports = {getAllBooks}