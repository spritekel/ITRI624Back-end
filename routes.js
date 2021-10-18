'use strict';

module.exports = function(app) {
    //Create variable which represent the location of business_case functions
    var business_case = require('./Documents/Business_Case/business_case');
    var project = require('./Documents/Project/project');
    var documentController = require('./Documents/documentController');
    //Create RESTful API codes and link them to methods in the business_case
    app.route('/document/:id/:name')
        .post(documentController.create_document)
        .get(documentController.get_document)
        .put(documentController.update_document);

    app.route('/document/:id')
        .get(documentController.get_collections);

    app.route('/business_case')
        .post(business_case.add_business_case)
        .put(business_case.update_business_case);

    app.route('/project/:id')
        .get(project.get_project_config)
        .post(project.create_project_config);

}