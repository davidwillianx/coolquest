var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var apiRouter = express.Router();
var API_TOKEN = 'MyFutureFuckingAwesomeKey';

var jsonAnswers = {
  brothers : ['Rosivaldo', 'luiz', 'laerte' ]
};

apiRouter.get('/',function(req,res){
  res.send('something');
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
        var token = jwt.sign(user, API_TOKEN);
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
  console.log('Validating');
  var token  = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token,API_TOKEN,function (error, decoded) {
      if(error) return res.status(401).json({success: false, message: 'Authetication failure, check your access data'});
      else {
        res.decoded = decoded;
        next();
      }
    })
  }else{
    return res.status(403)
              .json({
                success: false,
                message: 'No toke provided'
              });
  }
});

apiRouter.route('/api/survey')
  .get(function (req, res) {
    res.send('teste');
  });

module.exports = apiRouter;
