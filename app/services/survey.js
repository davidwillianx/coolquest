var surveySchema = require('../models/survey');

function SurveyService(){};

SurveyService.prototype.register = function(survey,cb){
 	var survey = surveySchema(survey);
	survey.save(function(error){
          if(error) cb(error);
	  cb(null,survey._id);
	});
};


SurveyService.prototype.findById = function(surveyId,cb){
  surveySchema.find({'_id':surveyId},function(error,survey){
	  if(error) cb(error);
	  cb(null, survey[0]);
  });
};

module.exports = SurveyService;
