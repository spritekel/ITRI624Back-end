const express = require('express') ;
const router = express.Router();

const UserController = require('../controllers/user') ;
require('dotenv').config();



router.get('/',UserController.user_get_all);

router.get('/:username', UserController.user_get_single);

router.patch('/:username', UserController.user_patch);

router.delete('/:username',UserController.user_delete);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

module.exports = router;