module.exports = class Users{

    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    index(){
        this.res.render('pages/users/form');
    }
}