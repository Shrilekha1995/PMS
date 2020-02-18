var express = require('express');
var router = express.Router();
var user=require('../controller/userController');
var project=require('../controller/projectController');

/* GET users listing. */
router.get('/users',user.getUsers);



module.exports = router;
