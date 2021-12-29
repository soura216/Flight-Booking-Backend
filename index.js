const Express = require('express');
const app = new Express();

const dotenv = require('dotenv');
dotenv.config();

app.use(Express.json())
app.use(Express.urlencoded({extended:false}))
app.use(Express.static(__dirname+'/public'))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
    key:process.env.KEY,
    secret:process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        expires: new Date(Date.now() + 600000),
        maxAge: 600000 
    }
}))

const flash = require('express-flash');
app.use(flash())

global.rootDirectory = __dirname;
app.set('view engine','ejs');

require('./utils/database_connection')();
require('./router/index')(app);
app.use(require('./utils/error_handler'));

app.listen(8000,()=>{
 console.log(`Server port ${process.env.PORT} is running`)
})