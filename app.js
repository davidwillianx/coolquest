var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var flash = require('flash');


var app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname+'/app/views'));

app.set('port',process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
  secret: 'thatisanamazingsoftwarethatyoushoulduse',
  resave : false,
  saveUninitialized: true,
  //cookie: {secure: true} only on https servers
}));
app.use(flash());

app.use(express.static(__dirname+'/app/public'));

app.use('*',function(req, res){
  res.render('index',{name: 'test'});
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
