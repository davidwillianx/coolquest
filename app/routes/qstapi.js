var express = require('express');
var User = require('../models/user');
var Survey = require('../models/survey');
var jwt = require('jsonwebtoken');
require('dotenv').load();
var apiRouter = express.Router();
var UserService = require('../layer/user.js');
var userService = new UserService();

var jsonAnswers = {
  brothers : ['Rosivaldo', 'luiz', 'laerte' ]
};

apiRouter.get('/',function(req,res){
  res.render('api-docs');
});

apiRouter.get('/docs',function (req, res) {
  res.render('api-docs');
});


apiRouter.post('/',function (req, res) {
  if(!(req.body.username || req.body.password)){
    res.status(401)
      .json({success: false, message: 'no user requirements to autheticate'});
  }else {
    userService.register(req.body.username, req.body.password,function(error){
 	if(error) 
		res.status(401).json({success: false, message: 'User persistence failure'});
   	res.json({success: true, message: 'have fun with you great coolquest apit token'}); 
    }); 
  }
});

apiRouter.post('/authenticate/',function (req, res) {
    if(req.body.username && req.body.password){
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
    }else 
     res.json({success: false, message: 'error.message'});
});

apiRouter.use(function (req, res, next) {
  var token  = req.body.token || req.query.token || req.headers['x-access-auth-token'];
  if(token){
    jwt.verify(token,process.env.API_TOKEN,function (error, decoded) {
      if(error) 
	 return res.status(401).json({success: false, message: 'Authetication failure, check your access data'});
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
  .post(function (req, res) {
    if(req.body.survey){
      if(req.body.survey.title && req.body.survey.available && req.body.survey.question){
        var newSurvey = new Survey({
          title: req.body.survey.title,
          available: req.body.survey.available,
          question: req.body.survey.question
        });

        newSurvey.save(function (error) {
          if(error)
            res.json({success: false, message:'persistence is not working man', error: error});
          res.json({success: true, message: 'Created successfull, have fun', id: newSurvey._id})
        });
      }else res.json({success: false, message:'Something wrong dude , check it out'});
    }else res.json({success: false , message: ' dude you didnt send a suvey for us, check you variables'});
  })
  .get(function (req, res) {
    if(req.params.surveyId){
      Survey.findOne({'_id':req.params.surveyId},function (error, survey) {
        if(error) res.json({success: false , message: 'I got error when i was loking 4 your search request'});
        if(!survey)
         res.json({success: false , message: 'I couldnt find anyone post by this Id'});
        else
         res.json({success: true,message: 'Here it is your survey', survey: survey});
      });
    }else res.json({success: false, message: 'ID dude send me the fking id'});
  });



module.exports = apiRouter;
