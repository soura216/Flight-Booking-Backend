const { Router } = require('express');
const router = new Router();
const Auth  = require('../services/auth');

router.get('/login',(req,res,next)=>{
    new Auth(req,res,next).loginForm();
})

module.exports = router;