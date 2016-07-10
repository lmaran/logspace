import config from "../../../config/environment";
import userService from "../userService";
import * as jwt from "jsonwebtoken";
import * as expressJwt from "express-jwt"; // Middleware that validates JsonWebTokens and sets req.user to be used by later middleware
import * as cookie from "cookie";

const compose = require("composable-middleware"); // Treat a sequence of middleware as middleware.
const validateJwt = expressJwt({ secret: config.secrets.session });

const loginService = {
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
    isAuthenticated: function () {
        // the logic that adds the user to the reques was moved to "addUserIfExist" middleware
        return function (req, res, next) {
            if (req.user) {
                next();
            } else {
                return res.status(401).send("Unauthorized");
            }
        };
    },

    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    hasRole: function (roleRequired) {
        if (!roleRequired) { throw new Error("Required role needs to be set"); }

        return compose()
            .use(this.isAuthenticated())
            .use(function meetsRequirements(req, res, next) {
                if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                    next();
                } else {
                    res.status(403).send("Forbidden");
                }
            });
    },

    /**
     * Returns a jwt token signed by the app secret
     */
    signToken: function (id) {
        return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: 60 * 60 * 24 * 365 }); // in seconds
    },

    // used by loginLocalController
    setCookies: function (req, res, token, userProfile) {
        let milliseconds = 1000 * 60 * 60 * 24 * 365;  // (1000 = 1 sec) http://stackoverflow.com/a/9718416/2726725
        let isSecure = process.env.NODE_ENV === "production"; // in production the coockie is sent only over https

        // res.cookie("TOKEN", "cookievalue", { maxAge:milliseconds, httpOnly: true, secure:isSecure });

        let c1 = cookie.serialize("access_token", token, { path: "/", maxAge: milliseconds, httpOnly: true, secure: isSecure });

        // "XSRF-TOKEN" is the default name in Anguler for CSRF token     
        let c2 = cookie.serialize("XSRF-TOKEN", token, { path: "/", maxAge: milliseconds });

        let c3 = cookie.serialize("user", JSON.stringify(userProfile), { path: "/", maxAge: milliseconds });

        // http://www.connecto.io/blog/nodejs-express-how-to-set-multiple-cookies-in-the-same-response-object/
        res.header("Set-Cookie", [c1, c2, c3]); // array of cookies http://expressjs.com/api.html#res.set
    },

    addUserIfExist: function () {
        return compose()
            // Validate jwt
            .use(function (req, res, next) {
                // allow access_token to be passed through query parameter as well
                // if (req.query && req.query.hasOwnProperty("access_token")) {
                //     req.headers.authorization = "Bearer " + req.query.access_token;
                // };

                if (req.cookies && req.cookies.access_token) {
                    req.headers.authorization = "Bearer " + req.cookies.access_token;
                    validateJwt(req, res, next);
                } else {
                    next();
                }
            })
            // Attach user to request
            .use(function (req, res, next) {
                if (req.user) {
                    userService.getByIdWithoutPsw(req.user._id, function (err, user) {
                        if (err) { return next(err); }
                        if (user) {
                            if (user.role.indexOf("admin") > -1) { user.isAdmin = true; } // add this property for navbar
                            if (user.role.indexOf("partner") > -1) { user.isPartner = true; } // add this property for navbar
                            req.user = user;
                        }
                        next();
                    });
                } else {
                    next();
                }
            });
    }
};

export default loginService;
