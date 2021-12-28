module.exports = (req,res,next)=>{
    if(req.session.csrf === req.body.csrf){
        return next()
    } else {
        return res.redirect('/error/403')
    }
}