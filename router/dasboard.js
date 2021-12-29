const { Router } = require('express');
const router  = new Router();
const Dashboard = require('../services/dashboard');
const session_handler = require('../utils/middleware/session_handler');

router.get('/',session_handler,(req,res)=>{ 
    new Dashboard(req,res).index()
});

module.exports = router; 