"use strict";
var userService_1 = require("../../userService");
var passport_local_1 = require("passport-local");
var passport = require("passport");
var config = function () {
    return passport.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password"
    }, function (email, password, done) {
        userService_1.default.getByEmail(email, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Acest email nu este inregistrat." });
            }
            if (!userService_1.default.authenticate(password, user.hashedPassword, user.salt)) {
                return done(null, false, { message: "Aceasta parola este incorecta." });
            }
            return done(null, user);
        });
    }));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;

//# sourceMappingURL=passportConfig.js.map
