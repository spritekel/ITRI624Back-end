const e = require('express');
const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    _id : new mongoose.Types.ObjectId(),
    username : String,
    password : String,
    email : String
});

var userModel = mongoose.model('users', userSchema);
module.exports = mongoose.model("Users", userModel);