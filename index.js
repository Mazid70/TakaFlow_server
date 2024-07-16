const express = require('express');
const cors = require('cors');
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