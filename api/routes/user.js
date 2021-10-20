const express = require('express') ;
const router = express.Router();

const UserController = require('../controllers/user') ;
require('dotenv').config();



router.get('/',UserController.user_get_all);

router.get('/:email', UserController.user_get_single );

router.patch('/:email', UserController.user_patch);

router.delete('/:email',UserController.user_delete);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

module.exports = router;