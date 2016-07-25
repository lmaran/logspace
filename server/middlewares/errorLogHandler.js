"use strict";
var environment_1 = require("./../config/environment");
var logger_1 = require("./../logging/logger");
var reqHelper_1 = require("./../logging/reqHelper");
// function errorLogHandler() {
//     return function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
//         let newReq = reqHelper.getShortReq(req);
//         let meta = { req: newReq, err: err };
//         logger.error("error logger", meta);
//         if (config.env === "development") {
//             next(err); // retuns errors (and stack trace) in the browser
//         } else {
//             next();
//         }
//     };
// }
var errorLogHandler = function (err, req, res, next) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorLogHandler;

//# sourceMappingURL=errorLogHandler.js.map
