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
        mongoose.model('SeoTag').find({}, function(err, tags){
            res.format({
                json: function(){
                    res.json(tags);
                }
            });
        });
    })
    .post(function(req, res, next){
        mongoose.model('SeoTag').create({
            pageID: req.body.pageID,
            tags: req.body.tags
        }, function(err, seoTag){
            res.format({
                json: function() {
                    res.json(seoTag);
                }
            });
        });
    });

router.route('/:id')
    .get(function(req, res, next){
        mongoose.model('SeoTag').findById(req.params.id, function(err, seotag){
            res.format({
                json: function() {
                    res.json(seotag);
                }
            });
        });
    });

router.put('/edit/:id', function(req, res, next){
    mongoose.model('SeoTag').findById(req.params.id, function(err, seoTag){
        seoTag.update({
            pageID: req.body.pageID,
            tags: req.body.tags
        }, function(err, seoTagID){
            res.format({
                json: function(){
                    res.json(seoTagID)
                }
            })
        });
    });
});

router.delete('/edit/:id', function(req, res, next){
    mongoose.model('SeoTag').findById(req.params.id, function(err, seoTag){
        if (err) {
            console.log(err);
        }
        else {
            seoTag.remove(function(err, seoTag){
                if (err) {
                    console.log(err);
                }
                else {
                    res.format({
                        json: function(){
                            res.json(seoTag);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;