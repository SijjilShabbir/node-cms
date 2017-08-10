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

// Pages get and create
router.route('/')
    .get(function(req, res, next){
        mongoose.model('Page').find({}, function(err, pages){
            if (err) {
                console.log('Pages not found: ' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(pages);
                    }
                });
            }
        });
    })
    .post(function(req, res, next){
        mongoose.model('Page').create({
            title: req.body.title,
            content: req.body.content,
            meta: [1,2,3],
            isPublished: true
        }, function(err, page){
            if (err) {
                console.log('Something went wrong while posting: ' + err);
            }
            else {
                console.log('Page successfully created! ' + req.body.title);
                res.format({
                    json: function() {
                        res.json(page);
                    }
                });
            }
        });
    });

// Get a specific page

router.route('/:id')
    .get(function (req, res) {
        mongoose.model('Page').findById(req.params.id, function(err, page){
            if (err) {
                console.log('Error retrieving page ID: ' + req.id + 'Error: ' + err);
            }
            else {
                console.log('Page successfully retrieved!' + req.params.id);
                res.format({
                    json: function() {
                        res.json(page);
                    }
                });
            }
        });
    });

// Update a page
router.put('/edit/:id', function(req, res, next){
    mongoose.model('Page').findById(req.params.id, function(err, page){
        page.update({
            title: req.body.title,
            content: req.body.content,
            isPublished: req.body.isPublished
        }, function(err, pageID){
            if (err) {
                console.log('Error while updating the page: ' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(pageID);
                    }
                });
            }
        });
    });
});

// Delete a page
router.delete('/edit/:id', function(req, res, next){
    mongoose.model('Page').findById(req.params.id, function(err, page){
        if (err) {
            console.log('Cannot find requested page: ' + req.params.id);
        }
        else {
            page.remove(function(err, page){
                if (err) {
                    console.log('Something went wrong while deleting: ' + err);
                }
                else {
                    res.format({
                        json: function() {
                            res.json('Page deleted with ID: ' + req.params.id);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;