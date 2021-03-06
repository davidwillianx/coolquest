
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var flash = require('flash');
var mongoose = require('mongoose');
require('dotenv').load();

mongoose.connect(process.env.MONGO_CONNECT);

var qstapi = require('./app/routes/qstapi');
var app = express();

/*app.engine('html', require('ejs').__express);*/
/*app.set('view engine', 'ejs');*/
app.set('port',process.env.PORT || 3000);
/*app.set('views',path.join(__dirname+'/app/views'));*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.API_SECRET,
  resave : false,
  saveUninitialized: true,
  //cookie: {secure: true} only on https servers
}));
app.use(flash());
app.use(express.static(__dirname+'/app/public'));

app.use('/api',qstapi);

app.use('/',function(req, res){
  res.sendFile(__dirname+'/app/views/home.html');
  /*res.render('./home.html');*/
});

app.use(function(req,res,next){
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});

if(app.get('env') === 'development'){
  app.use(function(req,res,next){
    res.status(error.status || 500);
    res.render('error',{
        message: error.message,
        error: error
      });
  });
}

app.use(function(req,res,next){
  res.status(error.status || 500);
  res.render('error',{
      message: error.message,
      error: {}
    });
});

app.listen(app.get('port'),function(){
  console.log('listening');
});

module.exports = app;
