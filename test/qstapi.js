// var describe =  require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');

process.env.MONGO_CONNECT = 'mongodb://localhost/coolquest';

describe('mongoose connection', function() {
  it('should not have connection error', function(done) {
      mongoose.connect(process.env.MONGO_CONNECT,function(error){
      should.not.exist(error);
      done();
    });
  });
});

describe('/api/answers', function() {
    it('should return answers as JSON', function(done) {
      request.get('/api/answers')
        .expect(200)
        .expect('Content-Type',/json/)
        .end(function(error, res){
          should.not.exist(error);
          res.body.brothers.should.not.be.empty;
          done();
        });
    })
  });
