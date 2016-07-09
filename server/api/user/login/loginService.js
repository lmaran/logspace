"use strict";
var environment_1 = require('../../../config/environment');
var userService_1 = require('../userService');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt'); // Middleware that validates JsonWebTokens and sets req.user to be used by later middleware
var compose = require('composable-middleware'); // Treat a sequence of middleware as middleware.
var validateJwt = expressJwt({ secret: environment_1.default.secrets.session });
var cookie = require('cookie');
var loginService = {
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
    isAuthenticated: function () {
        // the logic that adds the user to the reques was moved to 'addUserIfExist' middleware
        return function (req, res, next) {
            if (req.user) {
                next();
            }
            else {
                return res.status(401).send('Unauthorized');
            }
        };
    },
    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    hasRole: function (roleRequired) {
        if (!roleRequired) {
            throw new Error('Required role needs to be set');
        }
        return compose()
            .use(this.isAuthenticated())
            .use(function meetsRequirements(req, res, next) {
            if (environment_1.default.userRoles.indexOf(req.user.role) >= environment_1.default.userRoles.indexOf(roleRequired)) {
                next();
            }
            else {
                res.status(403).send('Forbidden');
            }
        });
    },
    /**
     * Returns a jwt token signed by the app secret
     */
    signToken: function (id) {
        return jwt.sign({ _id: id }, environment_1.default.secrets.session, { expiresIn: 60 * 60 * 24 * 365 }); // in seconds
    },
    // used by loginLocalController
    setCookies: function (req, res, token, userProfile) {
        var milliseconds = 1000 * 60 * 60 * 24 * 365; // (1000 = 1 sec) http://stackoverflow.com/a/9718416/2726725
        var isSecure = process.env.NODE_ENV === 'production'; // in production the coockie is sent only over https
        // res.cookie('TOKEN', 'cookievalue', { maxAge:milliseconds, httpOnly: true, secure:isSecure });
        var c1 = cookie.serialize('access_token', token, { path: '/', maxAge: milliseconds, httpOnly: true, secure: isSecure });
        // 'XSRF-TOKEN' is the default name in Anguler for CSRF token     
        var c2 = cookie.serialize('XSRF-TOKEN', token, { path: '/', maxAge: milliseconds });
        var c3 = cookie.serialize('user', JSON.stringify(userProfile), { path: '/', maxAge: milliseconds });
        // http://www.connecto.io/blog/nodejs-express-how-to-set-multiple-cookies-in-the-same-response-object/
        res.header('Set-Cookie', [c1, c2, c3]); // array of cookies http://expressjs.com/api.html#res.set
    },
    addUserIfExist: function () {
        return compose()
            .use(function (req, res, next) {
            // allow access_token to be passed through query parameter as well
            // if (req.query && req.query.hasOwnProperty('access_token')) {
            //     req.headers.authorization = 'Bearer ' + req.query.access_token;
            // };
            if (req.cookies && req.cookies.access_token) {
                req.headers.authorization = 'Bearer ' + req.cookies.access_token;
                validateJwt(req, res, next);
            }
            else {
                next();
            }
        })
            .use(function (req, res, next) {
            if (req.user) {
                userService_1.default.getByIdWithoutPsw(req.user._id, function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        if (user.role.indexOf('admin') > -1) {
                            user.isAdmin = true;
                        } // add this property for navbar
                        if (user.role.indexOf('partner') > -1) {
                            user.isPartner = true;
                        } // add this property for navbar
                        req.user = user;
                    }
                    next();
                });
            }
            else {
                next();
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loginService;

//# sourceMappingURL=loginService.js.map
