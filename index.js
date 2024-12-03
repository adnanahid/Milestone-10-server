const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const PORT = process.env.PORT || 3333;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri =
  "mongodb+srv://ConceptualSession:rIZIZwdvlMrAdHHo@cluster0.kgmqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect(); // Connect to MongoDB
    const conceptual = client.db("conceptual");
    const patient = conceptual.collection("patient");

    console.log("Successfully connected to MongoDB!");

    // Define POST route
    app.post("/patientsAppointmentForm", async (req, res) => {
      const document = req.body;
      const result = await patient.insertOne(document);
      res.status(201).send({ success: true, data: result });
      console.log(document);
    });

    app.get("/patientsAppointmentForm", async (req, res) => {
      const cursor = await patient.find().toArray();
      res.send(cursor);
    });

    app.get("/patientsAppointmentForm/:_id", async (req, res) => {
      const _id = req.params._id;
      const query = { _id: new ObjectId(_id) };
      const result = await patient.findOne(query);
      res.send(result);
    });

    app.patch("/patientsAppointmentForm/update/:_id", async (req, res) => {
      const _id = req.params._id;
      const filter = { _id: new ObjectId(_id) };
      const updateDoc = {
        $set: req.body,
      };
      const option = { upsert: true };
      const result = await patient.updateOne(filter, updateDoc, option);
      res.send(result)
    });

    app.delete("/patientsAppointmentFormDelete/:_id", async (req, res) => {
      const _id = req.params._id;
      const query = { _id: new ObjectId(_id) };
      const result = await patient.deleteOne(query);
      res.send(result);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
