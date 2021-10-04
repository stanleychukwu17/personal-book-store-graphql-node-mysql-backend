const dbPool = require('./db_connection'); // the mysql database connection pool

const getAllBooks = (bookId = 0) => {
    const james = dbPool.getConnection((err, con) => {
            if (err) { throw err; }

            return con.query('SELECT * FROM books', (qErr, rows) => {
            con.release();
            console.log(rows);
        })
    })
    console.log(james);
    return james;
    return [
        {'id':'name', 'name':'The boy, kelly handsome pon this one', authorId:1, category:'highlkife'}
    ]
}

module.exports = {getAllBooks}