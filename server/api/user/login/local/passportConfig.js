"use strict";
var userService_1 = require('../../userService');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    userService_1.default.getByEmail(email, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Acest email nu este inregistrat.' });
        }
        if (!userService_1.default.authenticate(password, user.hashedPassword, user.salt)) {
            return done(null, false, { message: 'Aceasta parola este incorecta.' });
        }
        return done(null, user);
    });
}));

//# sourceMappingURL=passportConfig.js.map
