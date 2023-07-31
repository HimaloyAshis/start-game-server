const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ogtg9l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const bookingCollection = client.db('bookingColleges').collection('colleges')
        const reviewCollection = client.db('bookingColleges').collection('reviews')


        app.get('/colleges/cards', async(req, res)=>{
            const result = await bookingCollection.find().limit(3).toArray()
            res.send(result)
        })

        app.get('/collegeName', async(req, res)=>{
            const result = await bookingCollection.find().toArray()
            res.send(result)
        })

        app.get('/cardDetail/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await bookingCollection.findOne(query)
            res.send(result)
        })


        app.get('/reviews', async (req, res)=>{
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('game start is live now')
})

app.listen(port, () => {
    console.log(`Game start is in the back-end port ${port}`)
})