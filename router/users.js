const { Router } = require('express');
const router = new Router();
const Users = require('../services/users');

router.get('/',(req,res)=>{
    new Users(req,res).index();
})

module.exports = router;