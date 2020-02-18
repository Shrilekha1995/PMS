var express = require('express');
var router = express.Router();
var checkToken = require('../auth/checkToken')

var projectController = require('../controller/projectController.js');
var userController = require('../controller/userController.js');
var backlogController = require('../controller/backlogController');
var taskController = require('../controller/taskController');

// for project
router.get('/getProjects', projectController.getProjects);
router.post('/addProject', projectController.addProject);
router.put('/updateProject/:id', projectController.updateProject);
router.delete('/deleteProject/:id', projectController.deleteProject);
router.get('/getProjects/:id', projectController.getProjectsById);

// for User Model
router.get('/getusers', userController.getUsers);
router.post('/registeruser', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/updateuser/:id', userController.updateUserById);
router.delete('/deleteUser/:id', userController.deleteUserById)

//for backlog model
router.get('/getBacklogs', backlogController.getBacklogs);
router.post('/addBacklog', backlogController.addBacklog);
router.get('/getBacklogsByProjectId/:projectId',backlogController.getBacklogsByProjectId);

//for task model
router.get('/getTasksByBacklogId/:backlogId',taskController.getTasksByBacklogId);

router.post('/addTask', taskController.addTask);
router.put('/updateTask/:taskId', taskController.updateTaskById);
router.delete('/deleteTask/:taskId', taskController.deleteTaskById);
router.put('/assignTaskByDeveloperId/:taskId',taskController.assignTaskByDeveloperId);

module.exports = router;