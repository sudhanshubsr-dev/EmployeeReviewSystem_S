const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();


const expressLayout = require('express-ejs-layouts');

// requiring session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// installin connect-mongo
const MongoStore = require('connect-mongo');

// connecting with the db
const db = require('./config/mongoose');

const flash = require('connect-flash');

const customMware = require('./config/middleware');

// to read the req from users
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayout);
// Middleware to serve static files
app.use(express.static('./assets'));



// to extract the style and scripts from partial views
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// creating the session and mongo store is use to store session cookie in db
app.use(session({
    name : 'ERS',
    secret : process.env.SESSION_COOKIE_KEY,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl : 'mongodb://localhost:27017/employee-review-system',
        autoRemove: 'disabled'
      },
      function(err){
        console.log(err || "connect-mongo setup is done");
      })

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserAuthenticatedUser);
app.use(passport.setAdminAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(3000, (err)=>{
    if(err){
        console.log(`Error in connecting with the server ${err}`);
        return;
    };
    console.log(`Connection with the server is made on port 3000`);
})