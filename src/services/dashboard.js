const User = require('../models/User');

module.exports = class Dashboard{

    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    index(){
        return this.res.render('pages/dasboard')
    }

    async usersList(){
        try{
            const usersList = await User.find(
                {'userRole':'User'},
                {_id:0}
            )
            return this.res.render('pages/user/list',{'usersList':usersList})
        } catch(err){
            return this.next(err)
        }
    }    

    async editAdminProfile(){
        try{
            return this.res.render('pages/admin-profile',{csrf:this.req.session.csrf}) 
        } catch(err){
            return this.next(err)
        }    
    }

    async editAdminProfileAction(){
        try{
            // console.log(this.req.file)
            // console.log(this.req.body)
        } catch(err){
            // console.log(err)
            return this.next(err)
        }
    }
}