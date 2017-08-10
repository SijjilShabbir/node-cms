var mongoose = require('mongoose');

var metaSchema = new mongoose.Schema({
    _creator: {
        type: String,
        ref: 'Page'
    },
    entityID: Number,
    metaKey: String,
    metaValue: String,
    metaPosition: Number,
    published: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
});

// Declare model
mongoose.model('Meta', metaSchema);