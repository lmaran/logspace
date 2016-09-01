"use strict";
var user_controller_1 = require("./user.controller");
var routes = function (app) {
    app.get("/api/user", user_controller_1.default.getAll);
    app.get("/api/user/:id", user_controller_1.default.getById);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;

//# sourceMappingURL=user.routes.js.map
