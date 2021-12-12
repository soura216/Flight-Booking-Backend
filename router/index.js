module.exports = function(app){
    app.use('/dashboard',require('./dasboard'));
    app.use('/users',require('./users'));
}