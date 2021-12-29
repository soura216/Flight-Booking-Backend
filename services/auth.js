const { randomBytes } = require('crypto');
const joi = require('joi');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class Auth{

    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async loginForm(){
        if(!this.req.session.csrf) this.req.session.csrf = await randomBytes(100).toString('base64');
        if(this.req.session.authId) return this.res.redirect('back');
        let remember = false;
        let emailId = '';
        if(this.req.cookies.rememberMe){
            remember = this.req.cookies.rememberMe.remember;
            emailId =  this.req.cookies.rememberMe.emailId;
        }
        return this.res.render('pages/login/form',{
            csrf:this.req.session.csrf,
            remember:remember,
            emailId:emailId
        })
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
                error.details.map((data,index)=>{
                    errorMsg.push(data.message)
                })
                this.req.flash('error',errorMsg.join(","))
                return this.res.redirect('/auth/login')
            } else {
                const userDetails = await User.findOne(
                    {emailId:value["emailId"],userRole:"User"},
                )
                if(userDetails){
                    const isPasswordMatch = await bcrypt.compare(value["password"],userDetails.password)
                    if(isPasswordMatch){
                        if(this.req.body.remember){
                            await this.res.cookie('rememberMe',{remember:true,emailId:this.req.body.emailId});
                        } 
                        this.req.session.authId = userDetails.userId.toString();
                        return this.res.redirect('/')
                    } else {
                        this.req.flash('error',"Your password does not match with your emailId")
                        return this.res.redirect('/auth/login') 
                    } 
                } else {
                    this.req.flash('error',"User doesn't exist in the collection")
                    return this.res.redirect('/auth/login')
                }
            }
        } catch(err){
            return this.next(err)
        }
    }

    async logoutAction(){
        try {
            await this.req.session.destroy();
            await this.res.clearCookie(process.env.KEY,{path:'/'});
            return this.res.redirect('/auth/login');
        } catch(err){
            return this.next(err)
        }    
    }

    async authDetails(){
        try {
            const userInfo = await User.findOne(
                {userId:this.req.session.authId},
                {_id:0,userName:1,emailId:1}
            );
            if(userInfo) return this.res.status(200).send({data:userInfo})
            else this.res.status(400).send({error: "User doesn't exist in the collection"});
        } catch(err) {
            return this.next(err)
        }   
    }
}