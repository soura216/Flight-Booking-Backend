const errorLog = require('./error_log');

module.exports = (err,req,res,next)=>{
    const statusCode = 500 || err.status;
    errorLog(err.message,statusCode);
    res.status(statusCode).send({ message: err.message });
}