const { randomBytes } = require('crypto');
const joi = require('joi');

module.exports = class Auth{

    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async loginForm(){
        if(!this.req.session.csrf){
            this.req.session.csrf = await randomBytes(100).toString('base64');
        }
        return this.res.render('pages/login/form',{csrf:this.req.session.csrf})
    }

    async loginAction(){
        try{ 
            const schema = joi.object({
                emailId: joi.string().email(),
                password: joi.string().required()
            })
            const options = {
                abortEarly: false, // include all errors
                allowUnknown: true, // ignore unknown props
                stripUnknown: true // remove unknown props
            };
            const { error, value }  = schema.validate(this.req.body,options);
            if(error){
                const errorMsg = []
                error.details.map((value,index)=>{
                    errorMsg.push(value.message)
                })
                this.req.flash('error',errorMsg.join(","))
                return this.res.redirect('/auth/login')
            }
        } catch(err){
            return this.next(err)
        }
    }
}