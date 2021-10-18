'use strict';
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_HOST;

exports.add_business_case = function (req, res) {

    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });

    //Get the body from the request.
    let doc = req.body;
    
    //Connect to the database
    client.connect(err => {
    
    //Get collection at db.doc location
    const collection = client.db("test").collection("doc");
    
    //Insert the object
    collection.insertOne(doc,function(error) {

    });
    
    //Close the connection
    client.close();
    
    });
    
    //Send result to the client
    res.send('Successful Insert of Business Case');
};

exports.update_business_case = function (req, res) {
    
    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    //Put the request body into a {$set : doc} format
    let doc = {$set: req.body};
    
    //Add search filter (query) in the following format {field : value}
    let query = {_id:req.params.id};
    
    //Connect to the database
    client.connect(err => {
    
    //Get collection at db.doc location
    const collection = client.db("test").collection("doc");
    
    //Update collection entry in collection with query
    collection.updateOne(query, doc,function(error) {
    });
    
    //Close the connection
    client.close();
    });
    
    //Send result to the client
    res.send('Successful Update of Business Case');
    res.status(200);
};