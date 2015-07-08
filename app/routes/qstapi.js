var express = require('express');
var router = express.Router();

var jsonAnswers = {
  brothers : ['Rosivaldo', 'luiz', 'laerte' ]
};

router.get('/',function(req,res){
  res.send('something');
});

router.get('/answers',function(req, res){
  res.json(jsonAnswers);
});

module.exports = router;
