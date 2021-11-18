const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./api/routes/user');
const projectsRoute = require('./api/routes/projects');
const sprintRouter = require('./api/routes/sprints');
const kanbanRouter = require('./api/routes/kanban');

mongoose.connect('mongodb+srv://testuser:' + process.env.DB_PASSWORD + '@itri624users.h5egg.mongodb.net/' + process.env.DB_NAME +'?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/user',userRoute);
app.use('/project', projectsRoute);
app.use('/sprint', sprintRouter);
app.use('/kanban', kanbanRouter);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500) ;
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;