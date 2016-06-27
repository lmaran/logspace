'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// const express = require('express');
var express = require('express');
var environment_1 = require('./config/environment');
var logger = require('./logging/logger');
var errorLogHandler = require('./logging/errorLogHandler');
var app = express();
exports.app = app;
require('./config/express')(app);
require('./routes')(app);
// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler());
// Start server
app.listen(environment_1.config.port, function () {
    logger.warn('Express server listening on %d in %s mode', environment_1.config.port, environment_1.config.env);
});
// Expose app
// exports = module.exports = app;
