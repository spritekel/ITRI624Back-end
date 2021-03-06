const Sprints = require('../models/sprintSchema');
const mongoose = require('mongoose');

exports.sprint_get_all = (req, res, next) => {
    Sprints.find()
    .select('_id sprName project')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            sprints: docs.map(doc => {
                return {
                    _id: doc._id,
                    sprName: doc.sprName,
                    project: doc.project,
                    request : {
                        type : 'GET',
                        url : 'https://mysterious-reef-01698.herokuapp.com/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.sprint_get_single = (req, res, next) =>{
    Sprints.find({project: req.params.project})
    .select('_id sprName project')
    .exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json({
                sprint : doc,
                request: {
                    type : 'GET',
                    description : 'Get single sprint',
                    url : 'https://mysterious-reef-01698.herokuapp.com/'

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
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//Change to find user by email
exports.sprint_patch = (req, res, next) =>{
    const id = req.params.sprName;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Sprints.update({sprName: id}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'sprint updated',
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

exports.sprint_delete = (req, res, next) =>{
    const id = req.params.sprName;
    Sprints.remove({sprName: id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'Sprint deleted successfully',
            request: {
                type : 'POST',
                url : 'https://mysterious-reef-01698.herokuapp.com/',
                body: {
                    id : 'String',
                    sprName: 'String',
                    project: 'String'
                }
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

exports.sprint_create = (req, res, next) =>{
    Sprints.find({sprName: req.body.sprName}).exec()
    .then(() => {
        const sprint = new Sprints({
            _id : new mongoose.Types.ObjectId(),
            sprName: req.body.sprName,
            project: req.body.project
        });
        sprint.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'sprint created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    })
}

exports.sprint_get_lists = (req, res, next) => {
    const sprID = req.params._id;
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

exports.sprint_update_lists = (req, res, next) =>{
    const id = req.params._id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Sprints.update({_id: id}, {$set: updateOps}).exec()
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
    