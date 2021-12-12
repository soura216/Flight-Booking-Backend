const Express = require('express');
const app = new Express();

const dotenv = require('dotenv');
dotenv.config();

app.use(Express.json())
app.use(Express.urlencoded({extended:false}))
app.use(Express.static(__dirname+'/public'))

const session = require('express-session');
app.use(session({
    key:process.env.KEY,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: new Date(Date.now() + 60000),
        maxAge: 60000 
    }
}))

global.rootDirectory = __dirname;
app.set('view engine','ejs');

require('./utils/database_connection')();
require('./router/index')(app);

app.listen(8000,()=>{
 console.log(`Server port ${process.env.PORT} is running`)
})