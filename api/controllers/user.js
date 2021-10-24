const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

exports.user_get_all = (req, res, next) => {
    User.find()
    .select('_id username role projects')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    username: doc.username,
                    role: doc.role,
                    projects: doc.projects,
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

exports.user_get_single = (req, res, next) =>{
    User.find({username: req.params.username})
    .select('_id username role projects')
    .exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json({
                user : doc,
                request: {
                    type : 'GET',
                    description : 'Get single user',
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
exports.user_patch = (req, res, next) =>{
    const id = req.params.username;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    User.update({username: id}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'User updated',
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
exports.user_delete = (req, res, next) =>{
    const id = req.params.username;
    User.remove({username: id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'User deleted successfully',
            request: {
                type : 'POST',
                url : 'https://mysterious-reef-01698.herokuapp.com/',
                body: {
                    id : 'String',
                    username: 'String',
                    role: 'String'
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

exports.user_signup = (req, res, next) =>{
    User.find({username: req.body.username}).exec()
    .then(user => {
        if(user.length > 0)
        {
            return res.status(422).json({
                message: 'User already exists in database'
            });
        }
        else
        {
            bycrypt.hash(req.body.password, 10, (err, hash) => {
                if(err)
                {
                    return res.status(500).json({
                        error: "is it hereXD"
                    });
                }
                else 
                {
                    //console.log(req.body.password)
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        role: req.body.role,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'user created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }) 
}

exports.user_login = (req, res, next) =>{
    User.find({username: req.body.username})
    .exec()
    .then(user=> {
        if(user.length < 1)
        {
            return res.status(401).json({
                message: 'No user'
            });
        }
        bycrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err)
            {
                return res.status(401).json({
                    message: 'failed bycrypt'
                });
            }
            if(result)
            {
                return res.status(200).json({
                    message: 'Auth successful' 
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

