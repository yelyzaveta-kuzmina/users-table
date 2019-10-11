const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { addUser, getAllUsers } = require("./database");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/user", (request, response) => {
  const user = request.body;
  addUser(user);
  response.status(200).send();
});

app.get("/users", async (request, response) => {
  // getAllUsers().then(uses => res.send({ users }));

  const allUsers = await getAllUsers();
  response.send(allUsers);
});

app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`));
