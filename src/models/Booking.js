const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Passenger Name is mandatory']
    },
    age:{
        type: Number,
        required: [true,'Passenger Age is mandatory']
    },
    gender:{
        type: String,
        required: [true,'Passenger Gender is mandatory']
    }
})

const passengersDetailsValidate = function(data){
    return Promise.resolve(Array.isArray(data) && data.length > 0);
}

const bookingSchema = new mongoose.Schema({
    bookingtId:{
        type: Number,
        unique: true
    },
    totalFare:{
        type: Number
    },
    bookingDate:{
        type: Date
    },
    travelBookingClass:{
        type: String
    },
    noOfTickets:{
        type: Number
    },
    passengersDetails:{
        type: [passengerSchema],
        validate:[
            {validator:passengersDetailsValidate, msg:'Passengers Details are required'}
        ],
    },
    bookingStatus: {
        type: String,
        enum: ['Confirmed','Modified','Canceled'],
        default: 'Confirmed'
    },
    flightId:{
        type: Number
    },
    userId:{
        type: Number
    }
});

module.exports = mongoose.model('flights',bookingSchema);