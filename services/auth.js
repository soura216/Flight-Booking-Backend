const { randomBytes } = require('crypto');

module.exports = class Auth{

    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    async loginForm(){
        if(!this.req.session.csrf){
            this.req.session.csrf = await randomBytes(100).toString('base64');
        }
        this.res.render('pages/login/form',{csrf:this.req.session.csrf})
    }

    loginAction(){

    }
}