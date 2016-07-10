// http://stackoverflow.com/a/31296619
// https://github.com/bithavoc/express-winston/blob/master/index.js

// this middleware act as a replacement for Morgan
// Morgan does not let you log req/res body: http://stackoverflow.com/a/30227670

import reqHelper from "./reqHelper";
import logger from "./logger";

const httpLogHandler = function () {

    return function httpLog(req, res, next) {
        req._startTime = new Date();

        // Manage to get information from the response too, just like Connect.logger does:
        let end = res.end;
        res.end = function (chunk, encoding) {
            let d: any = new Date();
            let newRes = {
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

            let newRec = reqHelper.getShortReq(req);
            let meta = {req: newRec, res: newRes};

            logger.info("http logger", meta);
        };

        next();
    };

};

export default httpLogHandler;
