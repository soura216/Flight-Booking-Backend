const joi = require('joi')

module.exports.flightsFormSchema = joi.object({
    airlinesName: joi.string().required(),
    flightStatus: joi.string().required(),
    departureTime: joi.date().required(),
    arrivalTime: joi.date().required(),
    seatsAvailable: joi.number().required(),
    businessClass: joi.number().required(),
    firstClass: joi.number().required(),
    stops: joi.number().required(),
    source: joi.string().required(),
    destination: joi.string().disallow(joi.ref('source')).required()
});

module.exports.joiSchemaOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
}

module.exports.flashError = (error,req)=>{
    const obj = {}
    error.details.map((data,index)=>{
        let key = data.message.split('"')[1]
        obj[key] = `${errorFieldName[key] || data.message.split('"')[1]} ${data.message.split('"')[2]}`
    })
    req.flash('error',obj);
    return;
};

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
    destination: 'Destination'
}