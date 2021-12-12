const User = require('../models/User');

module.exports = class Users{

    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }
    
    index(){
        this.res.render('pages/users/form');
    }

    async registerUser(){
        try {
            const user = new User();
            user.emailId = this.req.body.emailId;
            user.password = this.req.body.password;    
            user.userName = this.req.body.userName;
            let insertedUSer =  await user.save();
            this.res.status(200).send({insertedUSer:insertedUSer})
        } catch(err){
            if (err.name === 'ValidationError') 
                this.res.status(400).send({ error: err.message }); 
            else if(err.name === 'MongoServerError' && err.code === 11000 && Object.keys(err.keyValue)[0] === 'emailId')  
                this.res.status(400).send({error: 'email must be unique'});
            else this.next(err);
        }
        
    }
}