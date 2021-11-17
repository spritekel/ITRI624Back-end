const e = require('express');
const mongoose = require('mongoose');

const sprintSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sprName: {type: String, required: false},
    project: {type: String, ref: 'Projects'},
    lists: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            listName: {type: String, required: true},
            tasks: [
                {
                    _id: mongoose.Schema.Types.ObjectId,
                    taskName: {type: String, required: true},
                    taskUsers: [{type: String, ref: 'User'}],
                } 
            ]
        }
    ]
});

module.exports = mongoose.model('Sprint',sprintSchema);