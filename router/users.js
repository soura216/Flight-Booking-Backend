const { Router } = require('express');
const router = new Router();
const Users = require('../services/users');

router.get('/',(req,res,next)=>{
    new Users(req,res,next).index();
});

router.post('/registration',(req,res,next)=>{
    new Users(req,res,next).registration();
})

router.post('/login',(req,res,next)=>{
    new Users(req,res,next).login();
})

module.exports = router;