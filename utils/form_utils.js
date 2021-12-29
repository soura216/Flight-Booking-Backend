module.exports.flashError = (error,req)=>{
    const obj = {}
    error.details.map((data,index)=>{
        let key = data.message.split('"')[1]
        obj[key] = `${errorFieldName[key] || data.message.split('"')[1]} ${data.message.split('"')[2]}`
    })
    req.flash('error',obj);
    return;
};

module.exports.joiSchemaOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
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
    destination: 'Destination'
}