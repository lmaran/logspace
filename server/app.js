"use strict";
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var express = require("express");
var environment_1 = require("./config/environment");
var routes_1 = require("./routes");
var logger_1 = require("./logging/logger");
var errorLogHandler_1 = require("./logging/errorLogHandler");
var express_1 = require("./config/express");
var app = express();
express_1.default(app);
app.use("/", routes_1.default);
// catch 404 and 500
// see here: https://github.com/koroandr/generator-express-typescript/blob/master/generators/app/templates/app.ts
// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler_1.default());
// Start server
app.listen(environment_1.default.port, function () {
    logger_1.default.warn("Express server listening on %d in %s mode", environment_1.default.port, environment_1.default.env);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;

//# sourceMappingURL=app.js.map
