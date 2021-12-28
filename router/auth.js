const { Router } = require('express');
const router = new Router();
const Auth  = require('../services/auth');
const csrf_handler = require('../utils/middleware/csrf_handler')

router.get('/login',(req,res,next)=>{
    new Auth(req,res,next).loginForm();
})

router.post('/login',csrf_handler,(req,res,next)=>{
    new Auth(req,res,next).loginAction();
})

module.exports = router;