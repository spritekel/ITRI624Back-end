const express = require('express') ;
const router = express.Router();

const SprintsController = require('../controllers/sprint') ;
require('dotenv').config();


router.get('/',SprintsController.sprint_get_all);

router.get('/:project', SprintsController.sprint_get_single);

router.patch('/:sprName', SprintsController.sprint_patch);

router.delete('/:sprName',SprintsController.sprint_delete);

router.post('/sprint_create', SprintsController.sprint_create);

module.exports = router;