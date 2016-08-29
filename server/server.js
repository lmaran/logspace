"use strict";
var express = require("express");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
// app.use("/", router);
routes_1.default(app);

//# sourceMappingURL=server.js.map
