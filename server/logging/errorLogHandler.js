"use strict";
var environment_1 = require('./../config/environment');
var logger = require('./logger');
var reqHelper = require('./reqHelper');
function errorLogHandler() {
    return function errorHandler(err, req, res, next) {
        var newReq = reqHelper.getShortReq(req);
        var meta = { req: newReq, err: err };
        logger.error('error logger', meta);
        if (environment_1.default.env === 'development') {
            next(err); // retuns errors (and stack trace) in the browser
        }
        else {
            next();
        }
    };
}
module.exports = errorLogHandler;

//# sourceMappingURL=errorLogHandler.js.map
