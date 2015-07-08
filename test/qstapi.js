// var describe =  require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');

// describe('mongoose connection', function() {
//   it('should not have connection error', function() {
//     mongoose.connect(process.env.MONGO,function(error){
//       should.not.exist.error(error)
//     });
//   });
//
// });

describe('/api/answers', function() {
    it('return answers as JSON', function(done) {
      request.get('/api/answers')
        .expect(200)
        .expect('Content-Type',/json/)
        .end(function(error, res){
          should.not.exist(error);
          done();
        });
    })
  });
