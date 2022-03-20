const Booking = require('../../models/Booking');
const { bookingConfirmedSchema , joiSchemaOptions, errorMsg } = require('../../utils/form_utils');
const Flight = require('../../models/Flight');

module.exports = class Bookings{

    constructor(req,res,next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async confirmed(){
       try{
            const { error } = await bookingConfirmedSchema.validate(this.req.body,joiSchemaOptions);
            if(error) return this.res.status(400).send({ error: errorMsg(error) }); 
            const { travelBookingClass, noOfTickets, flightId, passengersDetails }  = this.req.body; 
            const isFlightExist = await Flight.findOne({
                $and: [
                    {'flightId':flightId,'flightStatus': 'Running'},
                    {'seatsAvailable':{$gte:noOfTickets}}
                ]
            });
            if(!isFlightExist) return this.res.status(400).send({ error: 'No seats are available'});
            const baseFare = isFlightExist.fare.find(element => (element.travelClass === travelBookingClass)).baseFare;
            const booking = new Booking();  
            booking.bookingtId = Date.now();
            booking.totalFare =  baseFare * noOfTickets;
            booking.travelBookingClass = travelBookingClass;
            booking.noOfTickets = noOfTickets;
            booking.bookingDate = Date.now();
            booking.flightId = flightId;
            booking.userId = this.req.userId;
            booking.passengersDetails = passengersDetails;
            const insertedId = await booking.save();
            await Flight.updateOne(
                {'seatsAvailable':{$exists:true},'flightId':flightId},
                {$inc:{seatsAvailable:-noOfTickets}}
            )
            return this.res.status(200).send({msg:'Your Booking is confirmed','bookingId':insertedId.bookingtId})
       } catch(err){
            if (err.name === 'ValidationError') 
            return this.res.status(400).send({ error: err.message }); 
            else return this.next(err)
       }
    }
} 