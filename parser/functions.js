const mysql = require('mysql2/promise');
const dbObject = {host:'localhost', user: 'root', password: 'password', database: 'dev_bookstore'};

// get all the books in our database
const getAllBooks = async (bookId = 0, authorId = 0) => {
    let qry = '';

    if (bookId > 0) { qry = `where id = ${bookId}`; }
    if (authorId > 0) {
        if (qry.length > 0) { qry = `and authorId = ${authorId}`; }
        else { qry = `where authorId = ${authorId}`; }
    }

    const connection = await mysql.createConnection(dbObject);
    const [rows, fields] = await connection.execute(`SELECT * FROM books ${qry}`);

    if (bookId > 0) { return rows[0]; }
    else if (authorId > 0) { return rows }
    else { return rows; }
}

// get all the authors available in our database
const getAllAuthors = async (authorId = 0) => {
    let qry = '';
    if (authorId > 0) { qry = `where id = ${authorId}`; }

    const connection = await mysql.createConnection(dbObject);
    const [rows, fields] = await connection.execute(`SELECT * FROM authors ${qry}`);

    if (authorId > 0) { return rows[0]; }
    return rows;
}

module.exports = {getAllBooks, getAllAuthors}