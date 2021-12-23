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

app.post('/games', async (req, res) => {
    try {

        const db = client.db(dbName);
        const col = db.collection("games");
        console.log("Connected correctly to server");

        await client.connect();

        let game = {
            name: req.body.name,
            background_image: req.body.bg,
            release: req.body.release,
            slug: req.body.slug,
            description: req.body.description,
        }

        res.status(200).send('succesfully uploaded')

        const p = await col.insertOne(game);

        const myDoc = await col.findOne();

        console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
})

app.delete('/deletegames/:id', async (req, res) => {
    try {
        await client.connect();

        const db = client.db(dbName);
        const col = db.collection("games");

        const query = {
            _id: ObjectId(req.params.id)
        }

        const gameDelete = await col.deleteOne(query)
        console.log(gameDelete);
        res.status(200).send(gameDelete)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'error',
            value: error
        });
    }

})

app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
})