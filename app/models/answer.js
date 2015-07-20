var mongoose = require('mongoose');
var answerSchema = mongoose.Schema({
	title: String,
	created: {type: Date ,default :  Date.now},
	questions: {
	   
	}
	
});

module.exports = mongoose.model('Answer', answerSchema); 
