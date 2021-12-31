const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const errorLog = require('./error_log');
const config = require('config');
const User = require('../models/User')

module.exports = function(){

    if(config.has('DB_URL')) mongoose.connect(config.get('DB_URL'),{autoIndex: true});
    
    mongoose.connection
        .once('open',async()=>{
            console.log("Databse sucessfully connecting")
            await createAdminUser();
        })
        .on('error',(error)=>{
            errorLog('Database Connection Failed', 500)
        })
}

const createAdminUser = async function(){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword =  await bcrypt.hash('1234',salt)
        const insertedUSer = await User.updateOne(
            {userRole:'Admin'},
            {
                $set:{
                    'userId': Date.now(),
                    'emailId': 'admin@gmail.com',
                    'password': hashPassword,
                    'userName': 'admin'
                }
            },
            {'upsert':true}
        );
        return insertedUSer;
    } catch(err){
        const statusCode = err.status || 500;
        const msg = err.message || 'Internal Server Error'
        errorLog(msg,statusCode)
    }
    
}