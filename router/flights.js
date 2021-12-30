const Flights = require('../services/flights');
const { Router } = require('express');
const router = new Router();
const session_handler = require('../utils/middleware/session_handler');
const csrf_handler = require('../utils/middleware/csrf_handler');

router.get('/create',session_handler,(req,res,next)=>{
    new Flights(req,res,next).createForm();
})

router.post('/create',[session_handler,csrf_handler],(req,res,next)=>{
    new Flights(req,res,next).createAction();
})

router.get('/list',session_handler,(req,res,next)=>{
    new Flights(req,res,next).list();
})

router.get('/edit/:flightId',session_handler,(req,res,next)=>{
    new Flights(req,res,next).editForm();
})

router.post('/edit',[session_handler,csrf_handler],(req,res,next)=>{
    new Flights(req,res,next).editAction();
})

module.exports = router;