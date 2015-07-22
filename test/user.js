var mongoose = require('mongoose');
var should = require('chai').should();
var expect = require('chai').expect;
var User = require('../app/models/user');


describe('User schema', function() {
  before(function (done) {
    mongoose.connection.close();
    mongoose.connect('mongodb://localhost/coolquest');
    User.remove().exec();
    done();
  });
  after(function (done) {
    User.remove().exec();
    mongoose.connection.close();
    done();
  });
  it('Should have', function(done) {
     var user = new User();
     expect(user).to.be.an.instanceof(User);
     done();
  });

  it('password as bycrypt', function(done) {
    var myPassword = 'alocriancada';
    var user = new User({
        username: 'Bozo',
        password: myPassword
      });
    user.save(function (error) {
      expect(error).to.not.exist;
      user.isPasswordValid(myPassword,function (error, isMath) {
        expect(isMath).to.be.true;
        done();
      });
    });
  });
});
