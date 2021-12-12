const { Router } = require('express');
const router  = new Router();
const Dashboard = require('../services/dashboard');

router.get('/',(req,res)=>{ 
    new Dashboard(req,res).index()
});

module.exports = router; 