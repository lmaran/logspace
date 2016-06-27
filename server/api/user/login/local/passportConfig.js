(function () {
    var LocalStrategy = require('passport-local').Strategy;
    var userService = require('../../userService');
    var passport = require('passport');
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        userService.getByEmail(email, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Acest email nu este inregistrat.' });
            }
            if (!userService.authenticate(password, user.hashedPassword, user.salt)) {
                return done(null, false, { message: 'Aceasta parola este incorecta.' });
            }
            return done(null, user);
        });
    }));
})();
