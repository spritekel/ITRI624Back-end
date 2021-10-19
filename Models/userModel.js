const e = require('express');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId(),
    username : String,
    password : String,
    email : String
});

module.exports = mongoose.model("Users", userSchema);