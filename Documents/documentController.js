require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_HOST;

exports.create_document = function (req, res) {
    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });

    //Get the body from the request.
    
    let projectID = req.params.id;
    let documentName = req.params.name;
    let doc = req.body;
    //let doc = {_id: projectID, req.body};
    console.log("Attempting to add: " + doc);
    //Connect to the database
    client.connect(err => {
    
    //Get collection at db.doc location
    const collection = client.db(projectID).collection(documentName);
    
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
    
    //Send result to the client
    
};

exports.get_collections = function (req, res) {
    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });

    //Get the body from the reqsuest.
    let doc = req.body;
    projectID = req.params.id;
    documentName = req.params.name;
    //Connect to the database
    client.connect(err => {
    
        //Get collection at db.doc location
        const db = client.db(projectID)
        
        //Insert the object
        db.listCollections().toArray(function(error, result) {
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
    //res.send('Successful Insert of Project');
};

exports.update_document = function (req, res) {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    
    
    let doc = {$set: req.body};

    console.log("Document to sync: " + doc);

    projectID = req.params.id;
    documentName = req.params.name;

    let query = {_id:projectID}

    client.connect(err => {
        console.log("Connection successful")
        const collection = client.db(projectID).collection(documentName);

        collection.updateMany(query, doc, { upsert:true }, function(error, result) {
            console.log("Updating...")
            if(error)
            {
                console.log(error);
                res.status(404);
                res.send("Error when syncing " + req.params.name);
            }
            else
            {
                console.log("Successfully synced " + req.params.name);
                res.status(200);
                res.send(req.params.name + " was successfully synced.");
            }
        });

        if(err)
        {
            console.log("Error: " + err);
        }
    })
}

exports.get_document = function (req, res) {
    //Initialise the client connection
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    projectID = req.params.id;
    documentName = req.params.name;

    //Connect to the database
    client.connect(err => {
    
        const collection = client.db(projectID).collection(documentName);
        
        //Find the object
        collection.find({}).toArray(function(error, result) {
            if(error) 
            {
                console.log(error);
                res.status(404);
                res.send("No document on server");
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
    
}