"use strict";
var environment_1 = require("./../config/environment");
var logger_1 = require("./logger");
var reqHelper_1 = require("./reqHelper");
function errorLogHandler() {
    return function errorHandler(err, req, res, next) {
        var newReq = reqHelper_1.default.getShortReq(req);
        var meta = { req: newReq, err: err };
        logger_1.default.error("error logger", meta);
        if (environment_1.default.env === "development") {
            next(err); // retuns errors (and stack trace) in the browser
        }
        else {
            next();
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorLogHandler;

//# sourceMappingURL=errorLogHandler.js.map
