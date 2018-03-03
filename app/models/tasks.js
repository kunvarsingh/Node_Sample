var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var Q = require('q');
var uniqueValidator = require('mongoose-unique-validator');
var Constant = require('../../config/constants');

var taskSchema = new Schema({

	taskTitle	  : { type: String, required :true},
	assignBy	  : {type:mongoose.Schema.Types.ObjectId, ref: 'users'},
	assignTo	  : [{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
	taskDetails   : { type: String},
	taskCreatedAt : { type: Date ,default : Date.now},
	assignedHours : { type: Number },
	spentHours	  : { type: Number },
	taskStatus    : { type: String, 
				   	  enum: ['created','in-progress','code-review','closed', 'rejected','resolved','re-opened'],
				      default: 'created'
				    },
	visibilityTo  : {type : String,
						enum: ['Private','Everyone'],
						default : 'Everyone'
					},			    
	taskImage	  : { type: String, default: Constant.imagePaths.defaultUserImage},
	taskComment	  : { type: String, default :"Noop's comment here"},
	taskGroup	  : { type: String, 
					  enum: ['andrioid','testing','designing','web developement'],
					  default : 'testing'
					},
	assigned      : { type: Boolean, default: false},
	approvedByManager : {type : Boolean , default : false},
	approvedByTeamLead : {type : Boolean , default : false},
	approvedByTester : {type : Boolean , default : false},
	isDeleted 	  : { type: Boolean ,default : false},
	createdAt     : { type: Date ,default : Date.now},
	updatedAt     : { type:Date, default: Date.now,select: false}
})

// taskSchema.plugin(uniqueValidator);
// taskSchema.plugin(uniqueValidator, {message: "Task already exists"});
var tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks;
