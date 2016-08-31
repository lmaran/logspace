"use strict";
var environment_1 = require("./config/environment");
var initialize_1 = require("./initialize");
var express = require("express");
var app = express();
app = initialize_1.default(app);
var server = app.listen(environment_1.default.port, function () {
    console.log("Express server listening on port " + environment_1.default.port + " in " + environment_1.default.env + " mode");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = server;

//# sourceMappingURL=app.js.map
