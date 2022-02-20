const jwt = require('jsonwebtoken');

module.exports =  (req,res,next)=>{
    const token = req.headers['x-auth-token'];
    try{
        const { userId } = jwt.verify(token,process.env['JWT-TOKEN']);
        req.userId = userId;         
        next();
    } catch(err){
        next({status:403,message:err.message||'Invalid Token'});
    } 
}