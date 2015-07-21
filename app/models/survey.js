var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var question = new Schema({
	 question: String,
	 answer: String
});

var surveySchema = new Schema({
	title: String,
	createdAt: {type: Date ,default :  Date.now},
	question: [question]
});

module.exports = mongoose.model('Survey', surveySchema);
