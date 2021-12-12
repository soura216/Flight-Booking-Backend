const mongoose = require('mongoose');
const errorLog = require('./error_log');

module.exports = function(){
    mongoose.connect(process.env.DB_URL);

    mongoose.connection
        .once('open',()=>{
            console.log("Databse sucessfully connecting")
        })
        .on('error',(error)=>{
            errorLog('Database Connection Failed', 500)
        })
}