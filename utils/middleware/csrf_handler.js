module.exports = (req,res,next)=>{
    if(req.session.csrf === req.body.csrf){
        next()
    } else {
        next()
    }
}