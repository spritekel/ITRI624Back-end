const Projects = require('../models/projectsSchema');
const mongoose = require('mongoose');

exports.projects_get_all = (req, res, next) => {
    Projects.find()
    .select('_id projName projUsers sprints')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            projects: docs.map(doc => {
                return {
                    _id: doc._id,
                    projName: doc.projName,
                    projUsers: doc.projUsers,
                    sprints: doc.sprints,
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

exports.projects_get_single = (req, res, next) =>{
    Projects.find({projName: req.params.projName})
    .select('_id projName projUsers sprints')
    .exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json({
                project : doc,
                request: {
                    type : 'GET',
                    description : 'Get single project',
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
exports.projects_patch = (req, res, next) =>{
    const id = req.params.projName;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Projects.update({projName: id}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'project updated',
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

//change to find user by email
exports.projects_delete = (req, res, next) =>{
    const id = req.params.projName;
    Projects.remove({projName: id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'Project deleted successfully',
            request: {
                type : 'POST',
                url : 'https://mysterious-reef-01698.herokuapp.com/',
                body: {
                    id : 'String',
                    projName: 'String',
                    projUsers: 'String',
                    Sprints: 'String'
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

exports.projects_create = (req, res, next) =>{
    Projects.find({projName: req.body.projName}).exec()
    .then(projects => {
        if(projects.length > 0)
        {
            return res.status(422).json({
                message: 'Project already exists in database'
            });
        }
        else
        {
            //console.log(req.body.password)
            const project = new Projects({
                _id : new mongoose.Types.ObjectId(),
                projName: req.body.projName,
                projUsers: req.body.projUsers,
                sprints: req.body.sprints
            });
            project.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'project created'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
}
        