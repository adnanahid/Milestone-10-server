const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3333;

const app = express();

//middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://ConceptualSession:rIZIZwdvlMrAdHHo@cluster0.kgmqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("all ok");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
