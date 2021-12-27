module.exports = class Error {
   
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    forbidden(){
        this.res.render('pages/error',{title:'Forbidden - 403',desc:'CSRF verification failed'})
    }

}