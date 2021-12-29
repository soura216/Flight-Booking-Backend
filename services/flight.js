const Flight = require('../models/Flight');
const Journey = require('../models/Journey');
const joi = require('joi')

module.exports = class Flight {
   
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createForm(){
        return this.res.render('pages/flight/form')
    }

    createAction(){
        
    }
}