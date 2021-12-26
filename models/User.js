const mongoose = require('mongoose');
const userBookingsSchema = require('./UserBookings');

const emailValidate = function(data){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return Promise.resolve(emailRegex.test(data));
}

const emailValidateErrorMsg = function(data){
    return `${data.value} is not a valid email`;
}

const modifyUsername = function(data){
    let arrOfData = data.split(' ');
    arrOfData.forEach((value,index)=>{
        arrOfData[index] = value.charAt(0).toUpperCase() + value.slice(1)
    })
    return arrOfData.join(" ");
}


const schema = new mongoose.Schema({
    emailId: { 
        type: String, 
        validate:[
            {validator:emailValidate, msg:emailValidateErrorMsg}
        ], 
        required: [true, 'emailID is mandatory'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    userName:{
        type: String,
        required: [true, 'userName is mandatory'],
        set: (data)=>{return data.charAt(0).toUpperCase() + data.slice(1)},
        get: modifyUsername
    },
    walletAmount:{
        type: Number,
        default: 0
    },
    userType:{
        type: String, 
        enum: ['Platinum', 'Gold', 'Silver'],
        default: 'Silver'
    },
    userRole:{
        type: String, 
        enum: ['Admin', 'User'],
        default: 'User'
    },
    bookings:[userBookingsSchema]
},{toJSON: {getters: true}})

module.exports = mongoose.model('User',schema)