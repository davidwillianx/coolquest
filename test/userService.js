var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var UserService = require('../app/layer/user');
var User = require('../app/models/user');
require('dotenv').load();
describe('UserService',function(){

   var userService = new UserService();
   before(function(done){
     mongoose.connection.close();	       	   
     mongoose.connect(process.env.MONGO_CONNECT);	   
     expect(userService).to.be.an.instanceof(UserService); 
     done();
   });
   after(function(done){
        User.remove().exec();
  	mongoose.connection.close();
	done();
   });
   it('#register',function(done){
	var user = {
	   name : 'turtuleZ',
	   psswd: 'pizzaPwr'
	};
	userService.register(user.name,user.psswd,function(error){
		should.not.exist.error;
		done();
	});
   });
});
