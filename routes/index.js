var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/ GET Hello World page. /
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/ GET Userlist page. /
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('users'); //ori : usercollection, se souvenir de correspondre les noms de variables
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/ GET profil page. /
router.get('/profil', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('users', {
            "users" : docs
        });
    });
});

/ GET New User page. /
router.get('/createAccount', function(req, res) {
    res.render('createAccount', { title: 'Create User' });
});

/ POST to Add User Service /
//nom de la fonction, pas de la page
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var ident = req.body.ident;
    var email = req.body.email;
    var password = req.body.password;

    // Set our collection
    var collection = db.get('users'); //ori : usercollection

    // Submit to the DB
    collection.insert({ //
        "ident" : ident,
        "email" : email,
        "password" : password
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist"); //ori : userlist, mettre "profil" ensuite
        }
    });
});