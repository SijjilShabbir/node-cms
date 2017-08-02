var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    title: String,
    content: String,
    published: {
        type: Date,
        default: Date.now()
    },
    meta: [{
        type: Number
    }],
    isPublished: Boolean
});

// Declare schema
mongoose.model('Page', pageSchema);