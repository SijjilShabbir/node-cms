var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

/*
* This portion must be placed before we get to our CRUD and REST.
* This is completely copy and pasted from method-override. Using use will make sure that every requests that
* hits this controller will pass through these functions.
*/

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

router.route('/')
    .get(function(req, res, next){
        mongoose.model('Meta').find({}, function(err, meta){
            if (err) {
                console.log('Error: ' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(meta);
                    }
                });
            }
        });
    })
    .post(function(req, res, next){
        mongoose.model('Meta').create({
            entityID: req.body.entityID,
            metaKey: req.body.metaKey,
            metaValue: req.body.metaValue,
            metaPosition: req.body.metaPosition
        }, function(err, meta){
            if (err) {
                console.log('Error creating meta: ' + err);
            }
            else {
                res.format({
                    json: function(){
                        res.json(meta)
                    }
                });
            }
        });
    });

router.route('/:id')
    .get(function(req, res, next){
        mongoose.model('Meta').findById(req.params.id, function(err, meta){
            if (err) {
                console.log('Error: ' + err);
            }
            else {
                res.format({
                    json: function(){
                        res.json(meta);
                    }
                });
            }
        });
    });

router.put('/edit/:id', function(req, res, next){
    mongoose.model('Meta').findById(req.params.id, function(err, meta){
        meta.update({
            entityID: req.body.entityID,
            metaKey: req.body.metaKey,
            metaValue: req.body.metaValue,
            metaPosition: req.body.metaPosition
        }, function(err, meta){
            if (err) {
                console.log('Error updating: ' + meta);
            }
            else {
                res.format({
                    json: function() {
                        res.json(meta);
                    }
                });
            }
        });
    });
});

router.delete('/edit/:id', function(req, res, next){
    mongoose.model('Meta').findById(req.params.id, function(err, meta){
        meta.remove(function(err, meta){
            if (err) {
                console.log('Error removing meta: ' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(meta);
                    }
                });
            }
        });
    });
});

module.exports = router;