"use strict";
var user_routes_1 = require("./api/user/user.routes");
var allRoutes = function (app) {
    user_routes_1.userRoutes(app);
};
exports.allRoutes = allRoutes;

//# sourceMappingURL=routes.js.map
