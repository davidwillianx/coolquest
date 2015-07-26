var express = require('express');
var User = require('../models/user');
var Survey = require('../models/survey');
var jwt = require('jsonwebtoken');
require('dotenv').load();
var apiRouter = express.Router();

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
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function (error) {
      if(error)
        res.status(401).json({success: false, message: 'register failure'});
      res.status(201).json({success: true, message: 'have fun with our great api'});
    });
  }
});

apiRouter.post('/authenticate/',function (req, res) {
  if(!(req.body.username || req.body.password))
     res.status(401).json({success: false, message: 'no data required to autheticate'});
  User.findOne({'username': req.body.username},function (error, user) {
    if(error) res.status(401).json({error: error});

    if(!user)
      res.status(401).json({success: false, message: 'user not found'});
    else
    user.isPasswordValid(req.body.password,function (error, isMath) {
      if(error) res.status(401).json({error: error});
      if(!isMath)
        res.status(401).json({success: false, message: 'invalid username or password'});
      else {
        var token = jwt.sign(user, process.env.API_TOKEN,{
          expiresInMinuts: 1440
        });
        res.json({
          success: true,
          message: 'Everything ok, ejoy your token dude',
          token: token
        });
      }
    });
  });
});

apiRouter.use(function (req, res, next) {
  var token  = req.body.token || req.query.token || req.headers['x-access-auth-token'];
  console.log(req.headers['x-access-auth-token']);
  if(token){
    jwt.verify(token,process.env.API_TOKEN,function (error, decoded) {
      if(error) return res.status(401).json({success: false, message: 'Authetication failure, check your access data'});
      else {
        res.decoded = decoded;
        next();
      }
    });
  }else{
    console.log('Authetication refused');
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
