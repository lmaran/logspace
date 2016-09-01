"use strict";
var user_routes_1 = require("./api/user/user.routes");
var home_routes_1 = require("./api/home/home.routes");
var allRoutes = function (app) {
    // API routes
    user_routes_1.default(app);
    home_routes_1.default(app);
    // server-side views
    // app.get("/", function(req: Request, res: Response) { res.render("home/home", { user: req.user }); });
    // app.get("/", function(req, res){ res.send("aaa");  });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = allRoutes;

//# sourceMappingURL=routes.js.map
