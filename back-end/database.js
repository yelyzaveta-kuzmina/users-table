const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost:27017/users-table';

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

var userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    country: String,
    gender: String,
    age: Number
  },
  { timestamps: { createdAt: 'updatedAt', updatedAt: 'createdAt' } }
);

const UserModel = mongoose.model('User', userSchema);

const addUser = async (user) => {
  return new UserModel(user).save();
};

const removeUserById = async (id) => {
  return UserModel.remove({ _id: id });
};

const getAllUsers = async ({ sortingDirection, sortBy, page, usersPerPage }) => {
  const users = await UserModel.find()
    .skip((page - 1) * usersPerPage)
    .limit(usersPerPage)
    .sort({
      [sortBy]: sortingDirection
    });
  return users;
};

const getNumberOfUsers = () => UserModel.count();

const getLatestUpdateUserTimestamp = () => {
  return UserModel.findOne({}, {}, { sort: { updatedAt: -1 } }).then((user) =>
    Number(user.updatedAt)
  );
};

module.exports = {
  addUser,
  removeUserById,
  getAllUsers,
  getLatestUpdateUserTimestamp,
  getNumberOfUsers
};
