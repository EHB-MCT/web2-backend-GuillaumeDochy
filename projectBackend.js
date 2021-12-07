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
const dbName = "courseproject";

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
        const clngs = await colli.find({}).toArray()

        res.status(200).json(clngs)
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