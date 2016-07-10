"use strict";
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var environment_1 = require('./config/environment');
var routes_1 = require('./routes');
var logger_1 = require('./logging/logger');
var errorLogHandler = require('./logging/errorLogHandler');
var app = express();
exports.app = app;
require('./config/express')(app);
app.use('/', routes_1.default);
// catch 404 and 500
// see here: https://github.com/koroandr/generator-express-typescript/blob/master/generators/app/templates/app.ts
// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler());
// Start server
app.listen(environment_1.default.port, function () {
    logger_1.default.warn('Express server listening on %d in %s mode', environment_1.default.port, environment_1.default.env);
});
// Expose app
// exports = module.exports = app;

//# sourceMappingURL=app.js.map
