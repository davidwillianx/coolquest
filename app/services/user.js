var userSchema = require('../models/user.js');

function UserService (){
}

UserService.prototype.register = function(name, password,cb){
   var user = new userSchema({
        username: name,
        password: password
     });
     user.save(function(error){
     	if(error) return cb(error);
	return cb(null);
     });	
};

UserService.prototype.authenticate = function(username, password, cb){
 userSchema.findOne({'username': username},function(error,user){
    if(error) return cb(error);
    if(user){
    	user.isPasswordValid(password,function(error, isMath){
	   if(isMath)
	     return cb(null, user);
	   return cb(new Error('invalid password or username'));		
	});
    }else cb(new Error('User does not exist'));
 });

}


module.exports = UserService;
