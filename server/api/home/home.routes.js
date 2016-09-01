"use strict";
var home_controller_1 = require("./home.controller");
var routes = function (app) {
    app.get("/", home_controller_1.default.index);
    // app.get("/api/user/:id", homeController.getById);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;

//# sourceMappingURL=home.routes.js.map
