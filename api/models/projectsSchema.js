const e = require('express');
const mongoose = require('mongoose');

const projectSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projName: {type: String, required: false},
    projUsers: [{type: String, ref: 'User'}],
    sprints: [{type: String, ref: 'Sprint'}]
});

module.exports = mongoose.model('Projects',projectSchema);