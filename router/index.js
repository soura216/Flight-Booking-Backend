module.exports = function(app){
    app.use('/',require('./dasboard'));
    app.use('/auth',require('./auth'));
    app.use('/error',require('./error'));

    app.use('/api/users',require('./api/users'));
}