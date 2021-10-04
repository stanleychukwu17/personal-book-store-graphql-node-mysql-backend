require('dotenv').config(); // sets up your dotenv environment
const express = require('express');
const app = express();


const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');


//--start-- connection to the mysql database
    const pool = mysql.createPool({
        connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: 'password',
        database : 'nodejs_beers'
    })
//--end--

app.listen(4000, () => {
    console.log('listening on port ', 4000)
})

app.use('/graphql', graphqlHTTP({schema, graphiql: true}))

app.get('/', (req, res) => {
    console.log('first request to the home page')
    res.json({'msg':'we good'})
})