import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

app.use(cors());
app.use(express.json());
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kdp7ray.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost/my-developer-portfolio:27017`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("my-developer-portfolio");
    const projects = database.collection("projects");

    app.get("/projects", async (req, res) => {
      const cursor = projects.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const cursor = await projects.findOne(query);
      res.send(cursor);
      // const result = await cursor.toArray();
      // res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My Developer Portfolio app is running!");
});

app.listen(port, () => {
  console.log(`My Developer Portfolio app listening on port ${port}`);
});
