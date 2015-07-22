// var describe =  require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');
var Survey = require('../app/models/survey');

describe('/api', function() {
  it('/ - should answer as form authenticate', function(done) {
    request.get('/api/')
    .expect(200)
    .expect('Content-Type','text/html; charset=utf-8')
    .end(function(error, res){
      should.not.exist(error);
      done();
    });
  });
  it('/ - shoudl send 401 res ', function(done) {
    request.post('/api/')
    .expect(401)
    .expect('Content-Type', /json/)
    .end(done);
  });
  it('/ - should send success for user persistence', function(done) {
    request.post('/api/')
    .send({username: 'bozo', password: 'alocriancada'})
    .expect(201)
    .expect('Content-Type',/json/)
    .end(function (error, res) {
      expect(error).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.message).to.be.equal('have fun with our great api');
      done();
    });
  });
  it('/authenticate - should send json token', function(done) {
    var user = {
      'username': 'bozo-palhaco',
      'password': 'alocriancada'
    };
    request.post('/api/authenticate/')
     .send(user)
     .expect(201)
     .expect('Content-Type',/json/)
     .end(function (error, userAccess) {
       expect(userAccess.body.token).to.be.undefined;
       done();
     });
  });
  it('/authenticate - should send json token', function(done) {
    var user = {
      'username': 'bozo',
      'password': 'alocriancada'
    };
    request.post('/api/authenticate/')
     .send(user)
     .expect(201)
     .expect('Content-Type',/json/)
     .end(function (error, userAccess) {
       expect(userAccess.body.token).to.not.be.undefined;
       done();
     });
  });
  describe('autheticate request', function() {
    var token;
    var user = {username: 'userAuth', password: 'authorization'};

    before(
      function (done) {
        request.post('/api/')
        .send(user)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (error, res) {
          request.post('/api/authenticate/')
          .send(user)
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (error, res) {
            token = res.body.token;
            done();
          });
      });
    });
    it('/api/survey - my surveys', function(done) {
      request.post('/api/survey')
      .send({token: token})
      .expect(200)
      .expect('Content-Type',/json/)
      .end(done);
    });
    describe('/api/survey - business', function() {
      before(function (done) {
        mongoose.connection.close();
        mongoose.connect('mongodb://localhost/coolquest');
        done();
      });
      it('survey post', function(done) {
        request.post('/api/survey')
        .send({token: token})
        .expect(200)
        .expect('Content-Type',/json/)
        .end(done);
      });
      it('should post and persist a surveyJson', function(done) {
        request.post('/api/survey')
        .send({
          token: token,
          survey: {
            title: 'About development activities',
            available: true,
            question:[
              { question: 'How many Developers use TDD?',
                answer: 'almost zero, because they don\'t care about quality'
              },
              {question: 'Java or PHP', answer: 'None of them'}
            ]
          }
        })
        .expect(200)
        .expect('Content-Type',/json/)
        .end(function (error, res) {
          expect(error).to.be.null;
          expect(res.body.id).to.not.be.undefined;
          done();
        });
      });
      it('should get by survey id', function(done) {

        var survey = new Survey({
          title: 'Dragons',
          question: [
            {
              question: 'how to trainning your dragron?',
              answer: 'may you can ask for some girl at game of thrones'
            },
            {
              question: 'Turn Down for?',
              answer: 'what'
            }
          ]
        });
        survey.save(function (error) {
          request.get('/api/survey/'+survey.id)
          .set('x-access-auth-token', token)
          .expect(200)
          .expect('Content-Type',/json/)
          .end(function(error, res) {
            expect(error).to.be.null;
            expect(res.body.success).to.be.true;
            expect(res.body.survey._id).to.be.equal(survey.id);
            done();
          })

        });
      });
    });
  });
});
