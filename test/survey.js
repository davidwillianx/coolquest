var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');
var Survey = require('../app/models/survey');

describe('Survey', function() {
  before(function (done) {
    mongoose.connection.close();
    mongoose.connect('mongodb://localhost/coolquest');
    Survey.remove().exec();
    done();
  });
  after(function (done) {
    Survey.remove().exec();
    mongoose.connection.close();
    done();
  });
  describe('#save()', function() {
    it('Should have survey schema', function(done) {
      var survey = new Survey();
      expect(survey).to.be.an.instanceof(Survey);
      done();
    });
    it('should save without error',function(done){
      var newSurvey = new Survey({
            title: 'Test question persistence :D',
            question:[
              {question: 'Shall we pass?',Survey: 'You Shall not Pass!!'},
              {question: 'Say my name?',Survey: 'Nodemberg'}
              ]
          });
        newSurvey.save(done);
    });
  });
  describe('#find', function() {
    it('should not find', function(done) {
      Survey.findOne({title: 'Bozo is incredible'},function (error, survey) {
        expect(error).to.be.null;
        expect(survey).to.be.null;
        done();
      });
    });
    it('should find', function(done) {
      Survey.findOne({title: 'Test question persistence :D'},function (error,survey) {
        expect(survey).to.not.be.null;
        expect(survey.title).to.equal('Test question persistence :D');
        done();
      });
    });
    it('should have 2 questions', function(done) {
      Survey.findOne({title:'Test question persistence :D'},function (error,survey) {
        expect(error).to.be.null;
        expect(survey.question.length).to.equal(2);
        done();
      });
    });
  });
});
