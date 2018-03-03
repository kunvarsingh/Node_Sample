var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var projectSchema = new Schema({

	projectName 		: { type: String, required :true},
	projectCreatedBy 	: { type:mongoose.Schema.Types.ObjectId, ref: 'users' , required : true},
	projectCreatedByName 	: { type:String},
	projectStartDate 	: { type: Date, required :true},
	projectEndDate 		: { type: Date, required :true},
	projectDetails 		: { type: String},
	status				: { type: String,
                            enum: ['created','in-progress', 'completed', 'closed', 'rejected'],
                            default:'created'
						  },
	assigneeTeam 		: [{type:mongoose.Schema.Types.ObjectId, ref: 'teams'}],
	assigneeManager 	: [{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
	assigneeLead 		: [{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
	assigneeDevelopers 	: [{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
	
	isTeamAssigneed		: { type: Boolean, default : false},
	isManagerAssigned 	: { type: Boolean, default : false},
	isLeadAssigned		: { type: Boolean, default : false},
	isDeleted		 	: { type: Boolean, default : false},
	createdAt 			: { type: Date, default : Date.now},
	updatedAt         	: { type:Date, default: Date.now,select: false}
});

projectSchema.plugin(uniqueValidator);
projectSchema.plugin(uniqueValidator, {message: "Project already exists"});
var projects = mongoose.model('projects', projectSchema);

module.exports = projects;
