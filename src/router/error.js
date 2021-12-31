const { Router } = require('express');
const router  = new Router();
const Error = require('../services/error');

router.get('/403',(req,res,next)=>{ 
    new Error(req,res,next).forbidden()
});

module.exports = router; 