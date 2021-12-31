module.exports = class Error {
   
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    forbidden(){
        return this.res.render('pages/error',{title:'Forbidden - 403',desc:'CSRF verification failed'})
    }

}