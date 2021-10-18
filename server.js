const express = require('express')
const app = express()
const port = 3000

//Add body parser
const bodyParser = require('body-parser');
app.use(bodyParser());

//Home page
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Listen at port defined earlier
app.listen(port, () => {
  console.log('Project Management Toolkit API running on port: ' + port)
})

//Link the app to the routes
var routes = require('./routes')
routes(app);