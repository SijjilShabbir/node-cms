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
        mongoose.model('Contact').find({}, function(err, contacts){
            if (err) {
                console.log('Something went wrong: ' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(contacts);
                    }
                });
            }
        });
    })
    .post(function(req, res, next){
        mongoose.model('Contact').create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        }, function(err, contact){
            if (err) {
                console.log('Something went wrong while creating contact message:' + err);
            }
            else {
                res.format({
                    json: function() {
                        res.json(contact);
                    }
                });
            }
        });
    });

router.route('/:id')
    .get(function(req, res, next){
        mongoose.model('Contact').findById(req.params.id, function(err, contact){
            if (err) {
                console.log('Error while retrieving contact ID: ' + req.params.id);
            }
            else {
                res.format({
                    json: function() {
                        res.json(contact);
                    }
                });
            }
        });
    });

router.put('/edit/:id', function(req, res, next){
    console.log("ID here: " + req.params.id);
    mongoose.model('Contact').findById(req.params.id, function(err, contact){
        if (err) {
            console.log('Error finding required contact: ' + err);
        }
        else {
            contact.update({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
            }, function(err, contactID){
                if (err) {
                    console.log('Error updating the contact');
                }
                else {
                    res.format({
                        json: function(){
                            res.json(contactID);
                        }
                    });
                }
            });
        }
    });
});

router.delete('/edit/:id', function(req, res, next){
    mongoose.model('Contact').findById(req.params.id, function(err, contact){
        if (err) {
            console.log('Contact not found');
        }
        else {
            contact.remove(function(err, contactID){
                if (err) {
                    console.log('Error deleting contact ID: ' + err);
                }
                else {
                    res.format({
                        json: function() {
                            res.json(contactID)
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;