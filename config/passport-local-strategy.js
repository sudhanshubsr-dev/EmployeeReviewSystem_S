const passport = require('passport');
require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');
const User = require('../models/users');

passport.use('localAdmin', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
}, async (req,email, password, done) => {
    try {
        let admin = await Admin.findOne({ email: email });
        if (admin) {
            if (admin.passcode === process.env.PASSCODE_KEY && admin.password === password) {
                return done(null, admin);
            }
        }
        req.flash('error','Invalid Username/Password');
        return done(null, false, { message: 'Invalid Admin Username/Password' });
    } catch (error) {
        req.flash('error',error)
        return done(error);
    }
}));

// Local Strategy for User
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
}, async (req,email, password, done) => {
    try {
        let user = await User.findOne({ email: email });
        if (user && user.password === password) {
            return done(null, user);
        }
        req.flash('error','Invalid Username/Password');
        return done(null, false, { message: 'Invalid Username/Password' });
    } catch (error) {
        req.flash('error',error)
        return done(error);
    }
}));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    return done(null, user.id);
});

// desrializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    // Use try-catch to handle errors
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, user);
        } else {
            // If user is not found in User model, check in Admin model
            const admin = await Admin.findById(id);
            if (admin) {
                done(null, admin);
            } else {
                done(null, false);
            }
        }
    } catch (error) {
        done(error);
    }
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    } else {
        // Handle unauthorized access as needed, e.g., redirect to a login page
        res.redirect('/user/sign-in'); // Example redirect for users
    }
};


passport.setUserAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // Set the authenticated user to res.locals for views
        res.locals.user = req.user;
    }
    next();
}

passport.checkAdminAuthentication = function(req, res, next) {
    if (req.isAuthenticated() && req.user.passcode === process.env.PASSCODE_KEY) {
        return next();
    } else {
        // Redirect or handle unauthorized access as needed
        res.redirect('/admin/login'); // For example, redirect to the admin login page
    }
};

passport.setAdminAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated() && req.user.passcode === process.env.PASSCODE_KEY) {
        // Initialize res.locals.admin as an empty object if it doesn't exist
        res.locals.admin = res.locals.admin || {};
        // Set the authenticated admin user to res.locals for views
        res.locals.admin.user = req.user;
    }
    next();
}





module.exports = passport;