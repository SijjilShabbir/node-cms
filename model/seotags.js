var mongoose = require('mongoose');

var seoTagsSchema = new mongoose.Schema({
    _creator: {
        type: String,
        ref: 'Page'
    },
    pageID: Number,
    tags: [{
        title: {
            type: String,
            default: 'Redsqware'
        },
        keywords: String,
        robots: {
            type: String,
            default: 'index, follow'
        },
        ogLocale: {
            type: String,
            default: 'en_US'
        },
        author: {
            type: String,
            default: 'Jon Gifford'
        }
    }]

});

mongoose.model('SeoTag', seoTagsSchema);