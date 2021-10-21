const express = require('express') ;
const router = express.Router();

const ProjectController = require('../controllers/project') ;
require('dotenv').config();


router.get('/',ProjectController.projects_get_all);

router.get('/:projName', ProjectController.projects_get_single);

router.patch('/:projName', ProjectController.projects_patch);

router.delete('/:projName',ProjectController.projects_delete);

router.post('/project_create', ProjectController.projects_create);

module.exports = router;