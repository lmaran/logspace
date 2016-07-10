// http://stackoverflow.com/a/31296619
// https://github.com/bithavoc/express-winston/blob/master/index.js
"use strict";
// this middleware act as a replacement for Morgan
// Morgan does not let you log req/res body: http://stackoverflow.com/a/30227670
var reqHelper_1 = require("./reqHelper");
var logger_1 = require("./logger");
var httpLogHandler = function () {
    return function httpLog(req, res, next) {
        req._startTime = new Date();
        // Manage to get information from the response too, just like Connect.logger does:
        var end = res.end;
        res.end = function (chunk, encoding) {
            var d = new Date();
            var newRes = {
                statusCode: res.statusCode,
                responseTime: d - req._startTime
            };
            res.end = end;
            res.end(chunk, encoding);
            // ---- Uncomment if you need to log the res.body ----
            // 
            // if (chunk) {
            //     let isJson = (res._headers && res._headers["content-type"]
            //         && res._headers["content-type"].indexOf("json") >= 0);
            // 
            //     newRes.body = isJson ? JSON.parse(chunk) : chunk.toString();
            // }
            var newRec = reqHelper_1.default.getShortReq(req);
            var meta = { req: newRec, res: newRes };
            logger_1.default.info("http logger", meta);
        };
        next();
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = httpLogHandler;

//# sourceMappingURL=httpLogHandler.js.map
