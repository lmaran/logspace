import config from "./../config/environment";
import logger from "./logger";
import reqHelper from "./reqHelper";

function errorLogHandler() {

    return function errorHandler(err, req, res, next) {
        let newReq = reqHelper.getShortReq(req);
        let meta = { req: newReq, err: err };

        logger.error("error logger", meta);

        if (config.env === "development") {
            next(err); // retuns errors (and stack trace) in the browser
        } else {
            next();
        }
    };

}

export default errorLogHandler;

