"use strict";
var admin_controller_1 = require("./admin.controller");
var routes = function (app) {
    app.get("/admin|/admin/*", admin_controller_1.default.index);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;

//# sourceMappingURL=admin.routes.js.map
