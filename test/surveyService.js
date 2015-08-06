var should = require('chai').should();
var expect = require('chai').expect;
var Survey  = require('../app/models/survey');
var mongoose = require('mongoose');
var SurveyService = require('../app/layer/survey');
require('dotenv').load();


describe('SurveyService',function(){

    var surveyService = new SurveyService();

    before(function(done){
	mongoose.connection.close();
	mongoose.connect(process.env.MONGO_CONNECT);
	expect(surveyService).to.be.an.instanceof(SurveyService);
	done();
    });
    after(function(done){
        Survey.remove().exec(); 
	mongoose.connection.close();    
	done();
    });

    it('#register',function(done){
	var survey = {
  	    title: 'If would',
	    createAt: Date.now,
	    question: [
     	      {
		question: 'who is you father?',
		answer: 'no dads im batman'
	      }
	    ]
	};    
	surveyService.register(survey,function(error, surveyId){
	  should.not.exist.error;	
	  expect(surveyId).to.not.be.undefined;
	  expect(surveyId).to.not.be.null;
	  done();	
	});    
    });
    it('#findById',function(done){
	var survey = new Survey({
	  title: 'is it work?',
	  createAt: Date.now,
	  question: [{question: 'is this real life?', answer: 'nope'}]
	});
	survey.save(function(error){
	   should.not.exist.error;	
	   surveyService.findById(survey._id,function(error, surveyFound){
             should.not.exist.error;	
	     expect(surveyFound).to.not.be.undefined;
	     expect(surveyFound.title).to.not.be.undefined;
	     done();
            }); 
	});
	    
     
    });
});


