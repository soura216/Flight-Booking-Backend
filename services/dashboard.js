module.exports = class Dashboard{

    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    index(){
        this.res.render('pages/dasboard')
    }
}