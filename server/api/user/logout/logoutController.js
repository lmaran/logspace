"use strict";
var cookie = require("cookie");
var logoutController = {
    logout: function (req, res, next) {
        // http://expressjs.com/api.html#res.clearCookie
        // res.clearCookie("access_token", { path: "/" }); 
        // res.clearCookie("user", { path: "/" });
        var c1 = cookie.serialize("access_token", "", { path: "/", expires: new Date(1) });
        var c2 = cookie.serialize("XSRF-TOKEN", "", { path: "/", expires: new Date(1) });
        var c3 = cookie.serialize("user", "", { path: "/", expires: new Date(1) });
        // http://www.connecto.io/blog/nodejs-express-how-to-set-multiple-cookies-in-the-same-response-object/
        res.header("Set-Cookie", [c1, c2, c3]); // array of cookies http://expressjs.com/api.html#res.set	
        res.redirect("/");
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logoutController;

//# sourceMappingURL=logoutController.js.map
