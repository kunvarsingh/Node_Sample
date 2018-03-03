	var express = require('express');
	var user = require('../app/controllers/userCtrl.js');
	var project = require('../app/controllers/projectCtrl.js');
	var task = require('../app/controllers/taskCtrl.js');
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('projects Api resource');
	});


	/*Routes for projects CRUD*/

	router.get('/viewprojects/:page', project.viewProjects);
	router.post('/createproject', project.createProject);
	router.delete('/deleteproject/:projectId', project.deleteProject);
	router.post('/getProjectById/:projectId', project.getProjectById);
	router.put('/updateproject/:projectId', project.updateProject);
	router.post('/projectsSearchByDate/:page', project.projectsSearchByDate);
	/*End Section */

	module.exports = router;

