var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');
var Answer = require('../app/models/answer.js');

process.env.MONGO_CONNECT = 'mongodb://localhost/coolquest';

//set befeore activities

describe('Answer', function() {
    describe('#save()', function() {
      it('should save without error', function(done) {
        var newAnswer = new Answer();
        expect(newAnswer).to.be.an.instanceof(Answer);
        done();
      });
    });
});
