const Flight = require('../models/Flight');
const { flashError, joiSchemaOptions, flightsFormSchema, flightsFormOldValue } = require('../utils/form_utils');
const moment = require('moment')

module.exports = class Flights {
   
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createForm(){
        const oldValue = {
            journey:{source:'',destination:''},
            fare:[{baseFare:''},{baseFare:''}]
        };
        return this.res.render('pages/flight/add',{csrf:this.req.session.csrf,flightDetails:oldValue})
    }

    async createAction(){
        try {
            const schema = flightsFormSchema;
            const { error, value }  = schema.validate(this.req.body,joiSchemaOptions);
            if(error){
                await flashError(error,this.req);
                const oldValue = await flightsFormOldValue(value);                
                return this.res.render('pages/flight/add',{csrf:this.req.session.csrf,flightDetails:oldValue})
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
            this.req.flash('success', 'Successfully created!');
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

    async editForm(){
        try{
            const flightId = this.req.params.flightId;
            let flightDetails = await Flight.findOne(
                {'flightId':flightId},
                {_id:0}
            )
            flightDetails = flightDetails.toObject()
            flightDetails.arrivalTime = moment(flightDetails.arrivalTime).format('YYYY-MM-DD');
            flightDetails.departureTime = moment(flightDetails.departureTime).format('YYYY-MM-DD');    
            return this.res.render('pages/flight/edit',{csrf:this.req.session.csrf,flightDetails:flightDetails})
        } catch(err){
            return this.next(err);
        }
    }

    async editAction(){
        try {
            const schema = flightsFormSchema;
            const { error, value }  = schema.validate(this.req.body,joiSchemaOptions);
            const { flightId } = this.req.body;
            if(error){
                await flashError(error,this.req);
                let oldValue = await flightsFormOldValue(value);  
                oldValue.flightId = flightId;             
                return this.res.render('pages/flight/edit',{csrf:this.req.session.csrf,flightDetails:oldValue})
            }
            
            await Flight.updateOne(
                {'flightId':flightId},
                {
                    $set:{
                        'airlinesName':value["airlinesName"],
                        'flightStatus': value["flightStatus"],
                        'departureTime': value["departureTime"],
                        'arrivalTime': value['arrivalTime'],
                        'seatsAvailable': value['seatsAvailable'],
                        'stops': value["stops"],
                        'journey.source': value["source"],
                        'journey.destination': value["destination"]
                    },
                    $push:{
                        'fare':{
                            $each:[
                                {travelClass:'businessClass',baseFare:value["businessClass"]},
                                {travelClass:'firstClass',baseFare:value["firstClass"]}
                            ],
                            $position:0,
                            $slice:2
                        }
                    }
                }
            )
            this.req.flash('success', 'Successfully updated!');
            return this.res.redirect('/flight/list')
        } catch(err){
            return this.next(err)
        }
    }
}