var express = require('express');
var router = express.Router();

var router = require('express').Router();
const taskController = require('../controllers/tasks.controller');

router.post('/add',[taskController.addTask]);
router.get('/get_all',[taskController.getAllTasks]);
// router.post('/get_task_details',[taskController.getTaskDetails]);

module.exports = router;