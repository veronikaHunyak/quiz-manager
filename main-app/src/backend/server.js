const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const Bcrypt = require("bcryptjs"); //Bcrypt is used for encrypting the user's password

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

var ObjectId = require("mongodb").ObjectId;

async function getDB() {
  const dbName = "quizmanagerdb";
  const url = `mongodb://localhost:27017/${dbName}`;
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.log(err.stack);
    return;
  }
}

//This is called once in the beginning of the project to establish some pre-configured test users for each user type
// app.get("/add-dummy-data", async (req, res) => {
//   const database = await getDB();
//   database.collection("users").insertMany([
//     {
//       username: "user1",
//       password: Bcrypt.hashSync("testuser1", 10),
//       usertype: "Edit",
//     },
//     {
//       username: "user2",
//       password: Bcrypt.hashSync("testuser2", 10),
//       usertype: "View",
//     },
//     {
//       username: "user3",
//       password: Bcrypt.hashSync("testuser3", 10),
//       usertype: "Restricted",
//     },
//   ]);
//   res.send();
// });

app.post("/signin", async (req, res) => {
  const database = await getDB();
  const response = await database
    .collection("users")
    .findOne({ username: req.body.username });
  if (response) {
    if (Bcrypt.compareSync(req.body.password, response.password)) {
      const { password, ...everythingElse } = response;
      res.send({
        statusCode: 200,
        user: everythingElse,
      });
      return;
    }
  }

  res.send({ statusCode: 401 });
});

app.get("/quizes", async (req, res) => {
  const database = await getDB();
  const response = await database.collection("quizes").find().toArray();
  res.send(response);
});

app.get("/questions/:id", async (req, res) => {
  const database = await getDB();
  const response = await database
    .collection("quizes")
    .findOne(ObjectId(req.params.id));

  res.send(response);
});

app.post("/update", async (req, res) => {
  const database = await getDB();
  const id = req.body._id;
  delete req.body._id;
  await database
    .collection("quizes")
    .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

  res.send({ statusCode: 200 });
});

app.post("/add", async (req, res) => {
  const database = await getDB();
  await req.body.forEach((quiz) => {
    database.collection("quizes").insertOne(quiz);
  });

  res.send({ statusCode: 200 });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
