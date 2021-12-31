module.exports = (req,res,next)=>{
    if(req.session.authId){
        next()
    } else {
        return res.redirect('/auth/login')
    }
}