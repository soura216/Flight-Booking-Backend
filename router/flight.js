const Flight = require('../services/flight');
const { Router } = require('express');
const router = new Router();
const session_handler = require('../utils/middleware/session_handler');
const csrf_handler = require('../utils/middleware/csrf_handler');

router.get('/create',session_handler,(req,res,next)=>{
    new Flight(req,res,next).createForm();
})

router.post('/create',[session_handler,csrf_handler],(req,res,next)=>{
    new Flight(req,res,next).createAction();
})

module.exports = router;