"use strict";
// import * as express from "express";
var routes_1 = require("./routes");
// let app: express.Application = express();
var expressCfg = function (app) {
    routes_1.default(app);
    return app;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = expressCfg;

//# sourceMappingURL=configure.js.map
