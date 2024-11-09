const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Avatar: String,
  Email: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
