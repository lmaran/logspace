"use strict";
var express = require("express");
var routes_1 = require("./routes");
var errorLogHandler_1 = require("./middlewares/errorLogHandler");
var express_1 = require("./config/express");
var app = express();
express_1.default(app);
app.use("/", routes_1.default);
// catch 404 and 500
// see here: https://github.com/koroandr/generator-express-typescript/blob/master/generators/app/templates/app.ts
// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;

//# sourceMappingURL=serverApp.js.map
