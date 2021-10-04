require('dotenv').config(); // sets up your dotenv environment
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');


app.listen(4000, () => {
    console.log('listening on port ', 4000)
})

app.use('/graphql', graphqlHTTP({schema, graphiql: true}))

app.get('/', (req, res) => {
    console.log('first request to the home page')
    res.json({'msg':'we good'})
})