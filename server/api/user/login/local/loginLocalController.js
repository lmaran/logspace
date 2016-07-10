"use strict";
// let auth: any = require("../loginService");
var loginService_1 = require("../loginService");
var passport = require("passport");
// Passport Configuration (once)
require("./passportConfig");
exports.authenticate = function (req, res, next) {
    // auth with custom callback: http://passportjs.org/docs/authenticate
    passport.authenticate("local", function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({ message: "Something went wrong, please try again." });
        }
        // let token = auth.signToken(user._id, user.role);
        var token = loginService_1.default.signToken(user._id);
        var userProfile = {
            name: user.name,
            email: user.email,
            role: user.role
        };
        loginService_1.default.setCookies(req, res, token, userProfile);
        if (req.is("json")) {
            res.json(userProfile); // for requests that come from client-side (Angular)
        }
        else {
            res.redirect("/");
        } // for requests that come from server-side (Jade)
    })(req, res, next);
};

//# sourceMappingURL=loginLocalController.js.map
