const joi = require('joi')
const moment = require('moment');

module.exports.flightsFormSchema = joi.object({
    airlinesName: joi.string().required(),
    flightStatus: joi.string().required(),
    departureTime: joi.date().iso().required(),
    arrivalTime: joi.date().iso().min(joi.ref('departureTime')).required(),
    seatsAvailable: joi.number().required(),
    businessClass: joi.number().required(),
    firstClass: joi.number().required(),
    stops: joi.number().required(),
    source: joi.string().required(),
    destination: joi.string().disallow(joi.ref('source')).required()
});

module.exports.registrationFormSchema = joi.object({
    emailId: joi.string().email(),
    password: joi.string().required(),
    userName: joi.string().required()
}); 

module.exports.bookingConfirmedSchema = joi.object({
    travelBookingClass: joi.string().required(),
    noOfTickets: joi.number().required(),
    flightId: joi.number().required()
});

module.exports.flightsFormOldValue = (value)=>{
    let oldValue = value;
    oldValue.journey = {
        source: value.source,
        destination: value.destination
    };
    oldValue.fare = [
        { baseFare:  value["businessClass"] },
        { baseFare:  value["firstClass"] }
    ];
    oldValue.arrivalTime = moment(oldValue.arrivalTime).format('YYYY-MM-DD');
    oldValue.departureTime = moment(oldValue.departureTime).format('YYYY-MM-DD');
    return oldValue;
};

module.exports.joiSchemaOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
}

module.exports.flashError = (error,req)=>{
    const errorObj = this.errorMsg(error);
    req.flash('error',errorObj);
    return;
};

module.exports.errorMsg = (error)=>{
    const obj = {}
    error.details.map((data,index)=>{
        let key = data.message.split('"')[1]
        obj[key] = `${errorFieldName[key] || data.message.split('"')[1]} ${data.message.split('"')[2]}`;
        if(key === 'arrivalTime' && obj[key].search("greater than or equal") != -1){
            obj[key] = `${obj[key]} ${errorFieldName['departureTime']}`
        } else if((key === 'arrivalTime' || key === 'departureTime') && obj[key].search("must be in ISO 8601 date format") != -1){
            obj[key] = `${errorFieldName[key]} must be in date format`
        } else if(key === 'destination' && obj[key].search('contains an invalid value') != -1){
            obj[key] = `${errorFieldName[key]} must be different than ${errorFieldName['source']}`
        }
    })
    return obj;
}

const errorFieldName = {
    airlinesName: 'Airlines Name',
    flightStatus: 'Flight Status',
    departureTime: 'Departure Time',
    arrivalTime: 'Arrival Time',
    seatsAvailable: 'Seats Available',
    businessClass: 'Business Class Fare',
    firstClass: 'First Class Fare',
    stops: 'Stops',
    source: 'Source',
    destination: 'Destination',
    emailId: 'Email ID',
    password: 'Password',
    userName: 'Username',
    travelBookingClass: 'Travel Booking Class',
    noOfTickets: 'No Of Tickets'
}   