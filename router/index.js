module.exports = function(app){
    app.use('/',require('./dasboard'));
    app.use('/users',require('./users'));
}