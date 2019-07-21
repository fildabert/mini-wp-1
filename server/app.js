if(process.env.NODE_ENV === "development") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection;
const port = process.env.PORT
const MONGO_DB = process.env.MONGO_DB
const routes = require('./routes/index')
const errorHandler = require("./helpers/errorHandler")


mongoose.connect(MONGO_DB, {useNewUrlParser: true, useCreateIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database')
});

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)  


// app.listen(port, () => console.log(`Listening on port ${port}`))