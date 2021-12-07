const {
    MongoClient,
    ObjectId
} = require('mongodb');

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const cors = require('cors');
const {
    query
} = require('express');

require('dotenv').config()

const port = process.env.PORT
const client = new MongoClient(process.env.COMPLETEURL);
const dbName = "session7_project";

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(300).redirect('/info.html')
})

app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
})