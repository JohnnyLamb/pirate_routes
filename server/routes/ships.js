var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Ship = require('../models/ships');

router.get('/', function(req, res, next){
  Ship.find(function(err, response){
    if(err){
      res.json({message:err});
    } else {
      res.json(response);
    }
  });
});


//save a new ship
router.post('/', function(req, res, next) {
    var newShip = new Ship({
      name: req.body.name,
      missions: req.body.missions
    });
    newShip.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});


//save a ship to a user
router.put('/:id', function(req, res, next) {
    var update = {
        name:req.body.name,
        missions:req.body.missions
    };
    console.log(update);
    var id = req.params.id;
    Ship.findByIdAndUpdateQ(id, update)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//delete a user's ships
router.delete('/:id', function(req, res, next) {
    Ship.findByIdAndRemove(req.params.id,
      function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;
