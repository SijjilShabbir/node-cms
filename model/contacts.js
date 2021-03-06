var mongoose = require('mongoose');

var contactQueries = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Contact', contactQueries);