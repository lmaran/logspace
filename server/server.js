"use strict";
var express = require("express");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
app.use("/", routes_1.default);

//# sourceMappingURL=server.js.map
