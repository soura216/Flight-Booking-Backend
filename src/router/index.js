module.exports = function(app){
    app.use('/auth',require('./auth'));
    app.use('/error',require('./error'));
    app.use('/',require('./dasboard'));
    app.use('/flight',require('./flights'));

    app.use('/api/users',require('./api/users'));
    app.use('/api/flights',require('./api/flights'));
}