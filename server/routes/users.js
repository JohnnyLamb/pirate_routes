var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users');
var Ship = require('../models/ships');

router.get('/', function(req, res, next){
      User.find()
    .populate('ships')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});


//save a new user
router.post('/', function(req, res, next) {
    var newUser = new User({
        name: req.body.name
    });
    newUser.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//save a ship to a user
router.put('/:id/ships', function(req, res, next) {
    var newShip = new Ship(req.body);
    newShip.saveQ();
    var update = { $push : {ships : newShip}};
    var options = {new:true};
    var id = req.params.id;

    User.findByIdAndUpdateQ(id, update, options)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});


//edit user
router.put('/:id', function(req, res, next) {
    console.log('getting here');
    var update = {name:req.body.name};
    var id = req.params.id;
    User.findByIdAndUpdate(id, update)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});



//list a user's ships
router.get('/:id/ships', function(req, res, next) {
    User.findById(req.params.id)
    .populate('ships')
    // .populate('missions')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user.ships);
        }
    });
});

module.exports = router;
