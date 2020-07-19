var express = require('express');
var router = express.Router();

var router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/signup',[authController.signupUser]);
router.post('/login',[authController.Userlogin]);
module.exports = router;
