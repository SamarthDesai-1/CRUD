const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: String,
  status: String
});

const userDB = mongoose.model("USER_DB", schema);

module.exports = userDB;