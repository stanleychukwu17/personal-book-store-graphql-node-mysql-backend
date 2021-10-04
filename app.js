require('dotenv').config(); // sets up your dotenv environment
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');


//--start-- connection to the mongodb server
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DEVELOPMENT_DB_DSN, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    app.listen(8080, () => { console.log("Listening on port 8080"); });
});
//--end--

// app.listen(4000, () => {
//     console.log('listening on port ', 4000)
// })

app.use('/graphql', graphqlHTTP({schema, graphiql: true}))

app.get('/', (req, res) => {
    console.log('first request to the home page')
    res.json({'msg':'we good'})
})