const { Router } = require('express');
const router = new Router();
const Flights = require('../../services/api/flights');
const jwt_handler = require('../../utils/middleware/jwt_handler');

router.post('/list',jwt_handler,(req,res,next)=>{
    new Flights(req,res,next).list();
})

module.exports = router;