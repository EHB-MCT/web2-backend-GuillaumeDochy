const {
    MongoClient,
    ObjectId
} = require('mongodb');

require('dotenv').config()

// Express
const express = require('express')
const app = express()
const port = process.env.PORT

// Middleware
const bodyParser = require('body-parser')

const cors = require('cors');
const {
    query
} = require('express');

// Mongo config

const client = new MongoClient(process.env.COMPLETEURL);
const dbName = "courseproject";

//Middleware
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(300).redirect('/info.html')
})

app.get('/games', async (req, res) => {
    try {
        await client.connect()
        const colli = client.db(dbName).collection('games')
        const gms = await colli.find({}).toArray()

        res.status(200).json(gms)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'something went wrong',
            value: error
        })
    } finally {
        await client.close()
    }
})

app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
})