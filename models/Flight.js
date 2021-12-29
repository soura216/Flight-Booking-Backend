const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema({
    travelClass:{
        type: String
    },
    baseFare:{
        type: Number
    }  
})

const schema = new mongoose.Schema({
    flightId:{
        type: Number
    },
    airlinesName:{
        type: String,
        required: [true, 'Airlines Name is mandatory']
    },
    flightStatus:{
        type: String,
        enum: ['Running','Cancelled'],
        default: 'Running'
    },
    departureTime:{
        type: String,
        required: [true, 'Departure Time is mandatory']
    },
    arrivalTime:{
        type: String,
        required: [true, 'Arrival Time is mandatory']
    },
    seatsAvailable:{
        type: Number,
        required: [true, 'Seats Available is mandatory']
    },
    fare:{
        type: [fareSchema],
        required: [true, 'Fare is mandatory']
    },
    stops:{
        type: Number,
        enum: [0,1,2,3],
        default: 1
    },
    bookings:{
        type: Array
    } 
})

module.exports = mongoose.model('Flight',schema)