	var express = require('express');
	var task = require('../app/controllers/taskCtrl.js');
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('task Api resource');
	});


	/*Routes for Task  CRUD*/
	
	router.get('/viewTasks/:page', task.viewTasks);
	router.post('/createTasks', task.createTasks);
	router.delete('/deleteTask/:taskId', task.deleteTask);
	router.post('/GetTaskById/:taskId', task.GetTaskById);
	router.put('/updateTask/:taskId', task.updateTask);
	router.get('/getTasksByStatus/:status/:page', task.getTasksByStatus);
	router.get('/customeResponse', task.customeResponse);
	router.get('/getAllTaskStatus', task.getAllTaskStatus);

	/*End Section */
	module.exports = router;

