const Flight = require('../models/Flight');
const { flashError, joiSchemaOptions, flightsFormSchema } = require('../utils/form_utils');

module.exports = class Flights {
   
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createForm(){
        return this.res.render('pages/flight/form',{csrf:this.req.session.csrf})
    }

    async createAction(){
        try {
            const schema = flightsFormSchema;
            const { error, value }  = schema.validate(this.req.body,joiSchemaOptions);
            if(error){
                await flashError(error,this.req);
                return this.res.redirect('/flight/create');
            }
            const flight = new Flight();
            flight.flightId = Date.now();
            flight.airlinesName = value["airlinesName"];
            flight.flightStatus = value["flightStatus"];
            flight.departureTime = value["departureTime"];
            flight.arrivalTime = value["arrivalTime"];
            flight.seatsAvailable = value["seatsAvailable"];
            flight.fare = [
                {travelClass:'businessClass',baseFare:value["businessClass"]},
                {travelClass:'firstClass',baseFare:value["firstClass"]}
            ];
            flight.stops = value["stops"];
            flight.journey = {
                source: value["source"],
                destination: value["destination"]
            }
            await flight.save();
            return this.res.redirect('/flight/list')
        } catch(err){
            return this.next(err)
        }
    }

    async list(){
        try{
            const { source, destination, departureTime, arrivalTime } = this.req.query;
            let flightsList = []
            if(source && destination && departureTime && arrivalTime){
                flightsList = await Flight.find(
                    {
                        $and: [
                            {'journey.source':{$eq:source}},
                            {'journey.destination':{$eq:destination}},
                            {'departureTime':{$gte:departureTime}},
                            {'arrivalTime':{$lte:arrivalTime}}
                        ]
                    },
                    {_id:0}
                )
            } else {
                flightsList = await Flight.find(
                    {},
                    {_id:0}
                )
            }
            const sourceList = await Flight.distinct('journey.source');
            const destinationList = await Flight.distinct('journey.destination');
            return this.res.render('pages/flight/list',{'flightsList':flightsList,'sourceList':sourceList,'destinationList':destinationList});
        } catch(err){
            return this.next(err)
        }
    }
}