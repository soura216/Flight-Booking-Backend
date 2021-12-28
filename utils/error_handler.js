const errorLog = require('./error_log');

module.exports = (err,req,res,next)=>{
    const statusCode = 500 || err.status;
    const msg = err.message || 'Internal Server Error'
    errorLog(msg,statusCode);
    return res.status(statusCode).send({ message: msg });
}