const Sprints = require('../models/sprintSchema');
const mongoose = require('mongoose');

exports.get_lists = (req, res, next) => {
    const sprintId = req.params._id;
    Sprints.find({_id: req.params._id})
    .select('sprName lists')
    .exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json({
                sprName : doc.sprName,
                lists: doc.lists,
                request: {
                    type : 'GET',
                    description : 'Get all lists and tasks for sprint',
                    url : 'https://mysterious-reef-01698.herokuapp.com/' + id
                }
            });
        }
        else
        {
            res.status(404).json({
                message: 'Entry not found in database'
            });
        }
    })
}

exports.update_lists = (req, res, next) =>{
    const sprintId = req.params._id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Sprints.update({_id: sprintId}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Lists updated',
            request : {
                type : 'GET',
                url : 'https://mysterious-reef-01698.herokuapp.com/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}