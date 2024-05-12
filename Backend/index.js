const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const passport = require('passport');
const expressSession = require("express-session")
// const {connectMongoose} = require('./database.js');

// connectMongoose();


//middlewares
app.use(express.json());
app.use(cors());

// app.use(expressSession({
//     resave: false,
//     saveUninitialized: false,
//     secret: "Hellooooo",
// }));

// app.use(passport.initialize());
// app.use(passport.session());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://laljisankhat7510:OrX9qNE0HGqSyC4c@online-reporting.wid4xqq.mongodb.net/?retryWrites=true&w=majority&appName=Online-Reporting";

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
    await client.connect();


    // create db
    const db = client.db("OnlineReporting");
    const reportCollections = db.collection("reports");
    const userCollections = db.collection("users");


    // post a report
    app.post("/post-issue", async (req, res) => {
        const body = req.body;
        body.createAt = new Date();

        const result = await reportCollections.insertOne(body);
        if(result.insertedId){
            return res.status(200).send(result);
        } else {
            return res.status(404).send({
                massage: "can't insert try again later",
                status: false
            });
        }
    });

    app.post("/sign-up", async (req, res) => {
        const b = req.body;
        b.createAt = new Date();
        // const result = await userCollections.insertOne(body);
        // if(result.insertedId){
        //     return res.status(200).send(result);
        // } else {
        //     return res.status(404).send({
        //         massage: "can't insert try again later",
        //         status: false
        //     });
        // }
        const user = await userCollections.findOne({email: req.body.name});
        if(user){
            return res.status(200).send(user);
        } else {
            const result = await userCollections.insertOne(b);
            // return res.status(200).send(result)
            if(result.insertedId){
                return res.status(200).send(result);
            } else {
                return res.status(404).send({
                    massage: "can't insert try again later",
                    status: false
                });
            }
        }
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});