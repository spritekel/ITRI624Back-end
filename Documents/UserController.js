var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
const User = require("../Models/userModel");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://testuser:' + process.env.DB_PASSWORD + '@itri624users.h5egg.mongodb.net/' + process.env.DB_NAME +'?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
secret: "node js mongodb",
resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


require('dotenv').config()


exports.create_user = (req, res, next) =>{
    User.find({email: req.body.email}).exec()
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
                        error: err
                    });
                }
                else 
                {
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email: req.body.email,
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