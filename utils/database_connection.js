const mongoose = require('mongoose');
const errorLog = require('./error_log');
const config = require('config');

module.exports = function(){

    if(config.has('DB_URL')) mongoose.connect(config.get('DB_URL'));
    
    mongoose.connection
        .once('open',()=>{
            console.log("Databse sucessfully connecting")
        })
        .on('error',(error)=>{
            errorLog('Database Connection Failed', 500)
        })
}