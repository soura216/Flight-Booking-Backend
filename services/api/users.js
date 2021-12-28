const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = class Users{

    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async registration(){
        try {
            const user = new User();
            user.emailId = this.req.body.emailId;
            const salt = await bcrypt.genSalt(10)
            const hashPassword =  await bcrypt.hash(this.req.body.password,salt)
            user.userId = Date.now();
            user.password = hashPassword;    
            user.userName = this.req.body.userName;
            const insertedUSer =  await user.save();
            return this.res.status(200).send({insertedUSer:insertedUSer})
        } catch(err){
            if (err.name === 'ValidationError') 
                return this.res.status(400).send({ error: err.message }); 
            else if(err.name === 'MongoServerError' && err.code === 11000 && Object.keys(err.keyValue)[0] === 'emailId')  
                return this.res.status(400).send({error: 'email must be unique'});
            else return this.next(err);
        }
    }

    async login(){
        try{
            const emailId = this.req.body.emailId;
            const password = this.req.body.password;
            let userDetails = await User.findOne(
                {'emailId':emailId},{_id:0,__v:0}
            );
            if(userDetails){
                const isPasswordMatch = await bcrypt.compare(password,userDetails.password)
                if(isPasswordMatch){
                    userDetails = userDetails.toObject()
                    delete userDetails.password;
                    return this.res.status(200).send({
                        userDetails: userDetails,
                        msg: 'Login successfully!'
                    })
                } else {
                    return this.res.status(400).send({error:"Your password does not match with your emailId"})
                }
            } else {
                return this.res.status(400).send({error: "User doesn't exist in the collection"})
            }        
        } catch(err){
            return this.next(err)
        }
    }
}