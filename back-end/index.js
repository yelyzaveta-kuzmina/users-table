const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  addUser,
  getAllUsers,
  getNumberOfUsers,
  getLatestUpdateUserTimestamp
} = require("./database");

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
  const latestUpdateTimestamp = await getLatestUpdateUserTimestamp();
  if (
    Number(request.query.latestUpdateTimestamp) ===
    Number(latestUpdateTimestamp)
  ) {
    response.sendStatus(304);
    return;
  }
  const numberOfUsers = await getNumberOfUsers();
  const allUsers = await getAllUsers();
  response.send({ allUsers, numberOfUsers, latestUpdateTimestamp });
});

app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`));
