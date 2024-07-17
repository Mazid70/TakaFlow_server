const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://assettrackerpro.netlify.app',
    ],
    credentials: true,
  })
);
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.p4xzv3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const usersCollection = client.db('MoneyFlow').collection('Users');

app.post('/users' ,async(req,res)=>{
const user=req.body;
const query = { email: user.email ,phone :user.phone}
const existingUser = await usersCollection.findOne(query);
if (existingUser) {
  return res.send({ message: 'User Already Exist', insertId: null });
}
const result = await usersCollection.insertOne(user);
res.send(result);
})

// app.get('/users/:email',async (req,res)=>{
//   const email=req.params.email;
//   const query={email:email};
//   const result= await usersCollection.findOne(query);
//   res.send(result)
// })
app.get('/users/:phone',async (req,res)=>{
  const phone=req.params.phone;
  console.log(phone)
  const query = {
    $or: [
      { phone: phone },
      { email: phone }
    ]
  };
  const result= await usersCollection.findOne(query);
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
  res.send('server is running');
});
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});