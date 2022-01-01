const User = require('../models/User');

module.exports = class Dashboard{

    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
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
            const userDetails = await User.findOne(
                {userId: this.req.session.authId},
                {_id: 0}
            )
            return this.res.render('pages/admin-profile',{csrf:this.req.session.csrf,userDetails:userDetails}) 
        } catch(err){
            return this.next(err)
        }    
    }

    async editAdminProfileAction(){
        try{
            let $setObj = {};
            $setObj.userName = this.req.body.userName;
            if(this.req.files.userProfile && this.req.files.userProfile[0].filename) $setObj.userProfile = this.req.files.userProfile[0].filename;
            await User.update(
                {userId: this.req.session.authId},
                {
                    $set: $setObj
                }
            );
            this.req.flash('success', 'Successfully updated!');
            return this.res.redirect('/')
        } catch(err){
            return this.next(err)
        }
    }
}