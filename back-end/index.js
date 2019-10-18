const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { addUser, removeUserById, getAllUsers, getNumberOfUsers } = require('./database');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/user', (request, response) => {
  const user = request.body;
  addUser(user);
  response.status(200).send();
});

app.delete('/user', (request, response) => {
  const { id } = request.query;
  removeUserById(id);
  response.status(200).send();
});

app.get('/users', async (request, response) => {
  const { sortingDirection, sortBy } = request.query;
  const usersPromise = getAllUsers({
    sortingDirection,
    sortBy
  });
  const usersCountPromise = getNumberOfUsers();
  const [users, usersCount] = await Promise.all([usersPromise, usersCountPromise]);

  response.send({ users, numberOfUsers: usersCount });
});

app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`));
