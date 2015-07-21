var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var USER_HASH_SALT = 9;
var userSchema = mongoose.Schema({
    username: String,
    password : String
});

userSchema.pre('save',function (next) {
  var user = this;

  bcrypt.genSalt(USER_HASH_SALT, function (error, salt) {
    if(error) next(error);
    bcrypt.hash(user.password,salt, null,function(error, hash){
      if(error) next(error);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordValid = function (password, cb) {
  bcrypt.compare(password,this.password,function (error, isMath) {
      if(error) cb(error);
      cb(null,isMath);
  });
}

module.exports = mongoose.model('User', userSchema);
