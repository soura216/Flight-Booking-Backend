const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    bookingId: Number,
    status: {
        enum: ['Confirmed','Modified','Modified']
    }
})