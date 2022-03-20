const Flight = require('../../models/Flight');

module.exports =  class Flights{

    constructor(req,res,next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async list(){
        try{
            let flighList;
            const { departure_time, arrival_time, source, destination } = this.req.body;
            let $filter = [];
            $filter.push(
                {'airlinesName':{$exists:true}}
            );
            if(departure_time) $filter.push(
                {'departureTime':{$gte:departure_time}}
            );
            if(arrival_time) $filter.push(
                {'arrivalTime': {$lte:arrival_time}}
            );
            if(source) $filter.push(
                {'journey.source':source}
            );
            if(destination) $filter.push(
                {'journey.destination':destination}
            ); 
            flighList = await Flight.find({$and:$filter});
            return this.res.status(200).send({msg:'ok',flighList:flighList})
        } catch(err){
            return this.next(err)
        }
    }

}