var mongoose = require('mongoose');
// Define schema
var blobSchema = new mongoose.Schema({
    name: String,
    badge: Number,
    dob: {
        type: Date, default: Date.now
    },
    isloved: Boolean
});

// Declare schema
mongoose.model('Blob', blobSchema);