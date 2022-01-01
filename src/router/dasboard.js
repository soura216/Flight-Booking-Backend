const { Router } = require('express');
const router  = new Router();
const Dashboard = require('../services/dashboard');
const session_handler = require('../utils/middleware/session_handler');
const csrf_handler = require('../utils/middleware/csrf_handler');
const image_upload = require('../utils/image_upload')

router.get('/',session_handler,(req,res,next)=>{ 
    new Dashboard(req,res,next).index()
});

router.get('/user-list',session_handler,(req,res,next)=>{ 
    new Dashboard(req,res,next).usersList()
});

router.get('/edit-admin-profile',session_handler,(req,res,next)=>{ 
    new Dashboard(req,res,next).editAdminProfile()
});

router.post('/edit-admin-profile',[session_handler,image_upload,csrf_handler],(req,res,next)=>{ 
    new Dashboard(req,res,next).editAdminProfileAction()
});

module.exports = router; 