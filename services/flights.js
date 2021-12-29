const Flight = require('../models/Flight');
const joi = require('joi');
const { flashError, joiSchemaOptions } = require('../utils/form_utils');

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
            const schema = joi.object({
                airlinesName: joi.string().required(),
                flightStatus: joi.string().required(),
                departureTime: joi.date().required(),
                arrivalTime: joi.date().required(),
                seatsAvailable: joi.number().required(),
                businessClass: joi.number().required(),
                firstClass: joi.number().required(),
                stops: joi.number().required(),
                source: joi.string().required(),
                destination: joi.string().required()
            })
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
            return this.res.redirect('/')
        } catch(err){
            return this.next(err)
        }
    }
}