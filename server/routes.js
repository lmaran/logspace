"use strict";
var user_routes_1 = require("./api/user/user.routes");
var home_routes_1 = require("./api/home/home.routes");
var admin_routes_1 = require("./api/admin/admin.routes");
var allRoutes = function (app) {
    // API routes
    user_routes_1.default(app);
    // server-side views
    home_routes_1.default(app);
    // client-side views
    admin_routes_1.default(app);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = allRoutes;

//# sourceMappingURL=routes.js.map
