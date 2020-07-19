var passport = require('passport');
var LocalStrategy = require('passport-local');

var functions = require('../functions');
const userController = require('../controllers/user.controller');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

exports.signupUser = (req, res, next) => {
    passport.authenticate('user_signup', (err, user, info) => {
        if (err) {
            req.message = "Can not registered.";
            return functions.sendErrorResponse(req, res, 400, req.message);
        }
        if (user) {
            if (user.status == 501) {
                return functions.sendErrorResponse(req, res, 400, user.msg);
            }
            if (user.status == 200) {
                req.message = user.msg;
                return functions.sendSuccessResponse(req, res, req.message);
                // res.send(req.message);
                // next();
                
            }
        }
        if (info) {
            return functions.sendErrorResponse(req, res, 400, info.message);
        }
    })(req, res, next);
}


passport.use('user_signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'

},
    function (req, username, password, done) {
        userController.registerUser(req, username, password).then((user) => {
            if (user) {
                done(null, user);
            }
        }).fail(function (err) {
            done(null, err);
        });
    }
));


//Login
exports.Userlogin = (req, res, next) => {
    passport.authenticate('user_login', (err, user, info) => {
        if (err) {
            req.message = "Can not login.";
            return functions.sendErrorResponse(req, res, 400, req.message);
        }
        if (user) {
            if (user.status == 501) {
                return functions.sendErrorResponse(req, res, 400, user.msg);
            }
            if (user.status == 200) {
                user = user.response;
                req.session.user = user; // storing user in session
                return functions.sendSuccessResponse(req, res, user);
            }
        }
        if (info) {
            return functions.sendErrorResponse(req, res, 400, info.message);
        }
    })(req, res, next);
}

//passport login for user 
passport.use('user_login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) { // callback with email and password from our form
        userController.loginUser(req, email, password).then((user) => {
            if (user) {
                done(null, user);
            }
        }).fail(function (err) {
            done(null, err);
        });
}));