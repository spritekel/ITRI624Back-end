const e = require('express');
const mongoose = require('mongoose');

const sprintSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sprName: {type: String, required: false},
    project: {type: String, ref: 'Projects'},
    startDate: {type: String, required: false},
    endDate: {type: String, required: false},
    lists: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            listName: {type: String, required: true, default: ''},
            tasks: [
                {
                    _id: mongoose.Schema.Types.ObjectId,
                    taskName: {type: String, required: true, default: ''},
                    taskUsers: [{type: String, default: ''}],
                } 
            ]
        }
    ]
});

module.exports = mongoose.model('Sprint',sprintSchema);