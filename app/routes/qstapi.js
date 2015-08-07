var express = require('express');
var User = require('../models/user');
var Survey = require('../models/survey');
var jwt = require('jsonwebtoken');
var apiRouter = express.Router();
var UserService = require('../services/user.js');
var SurveyService = require('../services/survey');
var userService = new UserService();
var surveyService = new SurveyService();
require('dotenv').load();

var jsonAnswers = {
  brothers : ['Rosivaldo', 'luiz', 'laerte' ]
};

apiRouter.get('/',function(req,res){
  res.render('api-docs');
});

apiRouter.get('/docs',function (req, res) {
  res.render('api-docs');
});


apiRouter.post('/',userParamsValidation,function (req, res) {
    userService.register(req.body.username, req.body.password,function(error){
 	if(error) 
		res.status(401).json({success: false, message: 'User persistence failure'});
   	res.json({success: true, message: 'have fun with you great coolquest apit token'}); 
    }); 
});

apiRouter.post('/authenticate/',userParamsValidation,function (req, res) {
   userService.authenticate(req.body.username, req.body.password, function(error, user){
      if(error)
         res.status(401).json({error: error});
      else{
 	var token = jwt.sign(user,process.env.API_TOKEN,{
 		expiresInMinutes: 1440
        });     
        res.json({
	  success: true,
	  message: 'Everything ok, enjoy your token',
   	  token  : token
        });
     }
    });
});

apiRouter.use(function (req, res, next) {
  var token  = req.body.token || req.query.token || req.headers['x-access-auth-token'];
  if(token){
    jwt.verify(token,process.env.API_TOKEN,function (error, decoded) {
      if(error) 
	 return res.status(401).json({success: false, message: 'Authentication failure, check your access data'});
      else {
        res.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).json({
              success: false,
              message: 'No token provided'
            });
  }
});


apiRouter.route('/survey/:surveyId?')
  .all(function(req,res,next){
    var surveyData = req.params.surveyId || req.body.survey;
    if(!surveyData)
       res.json({success: false, message: 'no survey data'});	    
    else next();   
  })
  .post(function (req, res) {
     surveyService.register(req.body.survey,function(error,surveyId){
         if(error)
  	    res.json({success: false, message: error});
         else
	 res.json({sucess: true, message:'Persistence ok', id: surveyId });
     });
   })
  .get(function (req, res) {
       surveyService.findById(req.params.surveyId,function(error,surveyFound){
           if(error) res.json({success: false,
			      message: 'survey not found dude, check if you params are correct'});       	
	   res.json({success:true, message: 'here is your survey',survey : surveyFound});
       }); 
    })
    .put(function(req, res){
       surveyService.findById(req.params.surveyId,function(error, surveyFound){
    	  if(error) res.json({success: false,  message: error});   
	  res.json({success: true, message: 'survey update done' });
       });    
    });
    

 function userParamsValidation(req,res, next){
   if(req.body.username && req.body.password)
	   next();
   else res.status(401).json({success: false, message: 'no user requirements'});
 }

module.exports = apiRouter;
