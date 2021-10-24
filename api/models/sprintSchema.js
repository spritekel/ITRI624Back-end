const e = require('express');
const mongoose = require('mongoose');

const sprintSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sprName: {type: String, required: false},
    project: {type: String, ref: 'Projects'}
});

module.exports = mongoose.model('Sprint',sprintSchema);