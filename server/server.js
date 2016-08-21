"use strict";
var express = require("express");
// import router from "./routes";
var routes_1 = require("./routes");
var app = express();
exports.app = app;
// app.use("/", router);
routes_1.allRoutes(app);

//# sourceMappingURL=server.js.map
