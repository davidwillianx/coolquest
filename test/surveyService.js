var should = require('chai').should();
var expect = require('chai').expect;
var Survey  = require('../app/models/survey');
var mongoose = require('mongoose');
require('dotenv').load();


describe('SurveyService',function(){
    before(function(done){
	mongoose.connection.close();
	mongoose.connect(process.env.MONGO_CONNECT);
	done();
    });
    after(function(done){
        Survey.remove().exec(); 
	mongoose.connection.close();    
	done();
    });

    it('#register',function(done){
	done();    
    });
});


