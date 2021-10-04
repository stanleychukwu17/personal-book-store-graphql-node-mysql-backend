const dbPool = require('./db_connection'); // the mysql database connection pool

const getAllBooks = async (bookId = 0) => {
    const rows = dbPool.query('SELECT * FROM books').then(rws => {
        console.log(rws);
    });

    return [
        {'id':'name', 'name':'The boy, kelly handsome pon this one', authorId:1, category:'highlkife'}
    ]
}

module.exports = {getAllBooks}