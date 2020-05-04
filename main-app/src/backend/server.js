const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const Bcrypt = require("bcryptjs");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

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

//this is called once in the beginning of the project to establish some test users
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
