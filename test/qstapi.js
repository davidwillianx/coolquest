// var describe =  require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');

describe('mongoose connection', function() {
  it('should not have connection error', function() {
    mongoose.connect('mongodb://localhost/sockio',function(error){
      should.not.exist.error(error)
    });
  });

});
