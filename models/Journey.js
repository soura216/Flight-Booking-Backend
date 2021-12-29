const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    source:{
        type: String,
        required: [true,'Source is mandatory']
    },
    destination:{
        type: String,
        required: [true,'Destination is mandatory']
    },
    flights:{
        type: Array
    }
},{collation:'flights'});

module.exports = mongoose.model('Journey',schema);
