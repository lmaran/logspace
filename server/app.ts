'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// const express = require('express');
import * as express from 'express';
import {config} from './config/environment';

const logger = require('./logging/logger');
const errorLogHandler = require('./logging/errorLogHandler');
const app: express.Application = express();

require('./config/express')(app);

require('./routes')(app);

// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler());

// Start server
app.listen(config.port, function () {
    logger.warn('Express server listening on %d in %s mode', config.port, config.env);
});

// Expose app
// exports = module.exports = app;
export { app }
