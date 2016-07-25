import config from "./../config/environment";
import logger from "./../logging/logger";
import reqHelper from "./../logging/reqHelper";
import { Request, Response, NextFunction }  from "express";

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



const errorLogHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
    let newReq = reqHelper.getShortReq(req);
    let meta = { req: newReq, err: err };

    logger.error("error logger", meta);

    if (config.env === "development") {
        next(err); // retuns errors (and stack trace) in the browser
    } else {
        next();
    }
};



export default errorLogHandler;

