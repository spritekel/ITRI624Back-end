const express = require('express') ;
const router = express.Router();

const KanbanController = require('../controllers/kanban') ;
require('dotenv').config();

router.get('/',KanbanController.get_lists);

router.get('/:sprintId', KanbanController.get_lists);

router.patch('/:sprintId', KanbanController.update_lists);


module.exports = router;