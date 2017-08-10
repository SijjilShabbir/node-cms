var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pageSchema = new mongoose.Schema({
    title: String,
    content: String,
    published: {
        type: Date,
        default: Date.now()
    },
    meta: [],
    seoTags: [],
    inNav: {
        type: Boolean,
        default: true
    },
    isPublished: {
        type: Boolean,
        default: true
    }
});

// Declare schema
mongoose.model('Page', pageSchema);