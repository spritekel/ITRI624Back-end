const e = require('express');
const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, default: 'empty'},
    role: {type: String, default: 'empty'},
    password : {type: String, required: true},
    projects: [{type: String, ref: 'Projects'}]
});

module.exports = mongoose.model('User',userSchema);