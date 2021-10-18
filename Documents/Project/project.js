'use strict';
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_HOST;

exports.create_project_config = function (req, res) {

    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });

    //Get the body from the request.
    let projectID = req.params.id;
    let doc = req.body;
    //let doc = {_id: projectID, req.body};
    console.log("Attempting to add Config for: " + projectID);
    if(projectID.includes(" ") || projectID.includes("."))
    {
        res.status(404);
        res.send("Incorrect Project ID");
    }
    else
    {
        //Connect to the database
        client.connect(err => {
        
            //Get collection at db.doc location
            const collection = client.db(projectID).collection("Config");
            
            //Insert the object
            collection.insertOne(doc,function(error) {
                if(error)
                {
                    console.log(error);
                    res.status(404);
                    res.send("Error on Insert of document: " + req.params.name);
                }
                else
                {
                    res.status(200);
                    res.send('Successful Insert of Document: ' + req.params.name);
                }
            });
            
            //Close the connection
            client.close();
        
        });
    }
    
    //Send result to the client
    
};

exports.get_project_config = function (req, res) {
    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });

    //Get the body from the request.
    //let doc = req.body;
    let projectID = req.params.id;
    let query = {};
    //Connect to the database
    console.log("Request to check if Config for " + projectID + " exists." )
    client.connect(err => {
    
    //Create var for storing JSON
    //var body = "";


    //Get collection at db.doc location
    const collection = client.db(projectID).collection("Config");
    
    //Find the object
    collection.find(query).toArray(function(error, result) {
        if(error) 
        {
            console.log(error);
        }
        else
        {
            console.log(result);
            res.status(200);
            res.send(result);
        }
    });
    
    //Close the connection
    client.close();
    
    });
    
    //Send result to the client
    //res.send(body);
}