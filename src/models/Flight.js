const mongoose = require('mongoose');
const journeySchema = require('./JourneySchema');

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
        type: Date,
        required: [true, 'Departure Time is mandatory']
    },
    arrivalTime:{
        type: Date,
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
    journey:{
        type: journeySchema
    }
})

module.exports = mongoose.model('Flight',schema)