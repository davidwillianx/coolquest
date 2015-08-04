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

UserService.prototype.autheticate = function(){

}


module.exports = UserService;
