const { Router } = require('express');
const Bookings = require('../../services/api/bookings');
const jwt_handler = require('../../utils/middleware/jwt_handler');

const router = new Router();

router.post('/confirmed',jwt_handler,(req,res,next)=>{
    new Bookings(req,res,next).confirmed();
})

module.exports = router;

