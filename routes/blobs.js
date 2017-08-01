var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // Mongo connection
    bodyParser = require('body-parser'), // Parses information from POST
    methodOverride = require('method-override'); // Used to manipulate POST

/*
* This portion must be placed before we get to our CRUD and REST.
* This is completely copy and pasted from method-override. Using use will make sure that every requests that
* hits this controller will pass through these functions.
*/

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

// CRUD functionality with REST and HTML response types

router.route('/')
    // Get all blobs
    .get(function(req, res, next) {
        // Get all blobs
        mongoose.model('Blob').find({}, function(err, blobs){
            if(err) {
                console.log('Error getting blobs: ' + err);
            }
            else {
                // respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    html: function(){
                        res.render('blobs/index', {
                            title: 'All my Blobs',
                            "blobs": blobs
                        });
                    },
                    json: function() {
                        res.json(blobs);
                    }
                });
            }
        });
    })
    // POST a new blob
    .post(function(req, res, next){
        console.log('Response here: ' + req.body.name);
        mongoose.model('Blob').create({
            name: req.body.name,
            badge: req.body.badge,
            dob: req.body.dob,
            isloved: req.body.isloved
        }, function(err, blob){
            if (err) {
                console.log('Error creating Blob: ' + err);
            }
            else {
                res.format({
                    html: function() {
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs");
                    },
                    json: function() {
                        res.json(blob);
                    }
                });
            }
        });
    });

// Add new blob page
router.get('/new', function(req, res){
    res.render('blobs/new', {title: 'Add new Blob here'});
});

// Route middleware to validate :id
router.param('id', function(req, res, next, id){
    mongoose.model('Blob').findById(id, function(err, blob){
        // if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404);
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function() {
                    next(err);
                },
                json: function() {
                    res.json({message : err.status  + ' ' + err});
                }
            });
        }
        else {
            req.id = id;
            next();
        }
    });
});

// Get call
router.route('/:id')
    .get(function(req, res){
        mongoose.model('Blob').findById(req.id, function(err, blob){
            if (err) {
                console.log(req.id + ' ID not found ');
            }
            else {
                res.format({
                    html: function() {
                        res.render('blobs/show', {
                            title: 'Single Blob page',
                            "blob": blob
                        });
                    },
                    json: function() {
                        res.json(blob);
                    }
                });
            }
        });
    });

// Expport routes
module.exports = router;