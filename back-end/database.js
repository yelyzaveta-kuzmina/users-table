const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017/users-table";

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  name: String,
  surname: String
});

const UserModel = mongoose.model("User", userSchema);

const addUser = async user => {
  return new UserModel(user).save();
};

const getAllUsers = () => {
  const users = UserModel.find();
  return users;
};

module.exports = {
  addUser,
  getAllUsers
};
