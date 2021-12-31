const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    source:{
        type: String,
        required: [true,'Source is mandatory']
    },
    destination:{
        type: String,
        required: [true,'Destination is mandatory']
    }
});

