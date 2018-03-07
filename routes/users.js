var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/ GET accueil page. /
router.get('/accueil', function(req, res) {
  //test dans mongodb
  if(true){
    res.render('accueil', { title: 'Hello, World!' });
  }
});