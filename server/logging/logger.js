"use strict";
var environment_1 = require("../config/environment");
var winston = require("winston");
var rollbarTransport_1 = require("./rollbarTransport");
var chalk = require("chalk");
require("./rollbarTransport"); // init Rollbar transport for Winston
// require("winston-loggly"); // init Loggly transport for Winston
var logger = new winston.Logger();
var scrubFields = ["password", "oldPassword", "newPassword", "hashedPassword", "salt"];
// Winston && Rollbar: debug > info > warning > error
// E.g. "info" level catches also "warning" or "error" but not "debug"
if (environment_1.default.env === "production" || environment_1.default.env === "staging") {
    // logger.add(winston.transports.RollbarLogger, {
    logger.add(rollbarTransport_1.default, {
        level: "warn",
        rollbarAccessToken: environment_1.default.rollbarToken,
        rollbarConfig: {
            environment: environment_1.default.env,
            scrubFields: scrubFields
        }
    });
}
else {
    logger.add(winston.transports.Console, {
        level: "debug",
        formatter: formatterFunc
    });
}
function formatterFunc(options) {
    // Return string will be passed to logger.
    var meta = options.meta;
    var msg = "";
    if (options.level === "info" || options.level === "warn") {
        if (meta && meta.hasOwnProperty("req")) {
            msg = msg + meta.req.method + " " + meta.req.url;
            if (meta.res) {
                msg = msg + " " + getColorStatus(meta.res.statusCode) + " - " + meta.res.responseTime + " ms "; // + meta.res.responseTime2;
            }
        }
        else {
            msg = msg + (undefined !== options.message ? options.message : "");
            if (meta && Object.keys(meta).length > 0) {
                msg = msg + "\n" + JSON.stringify(meta, null, 4);
            }
        }
    }
    else if (options.level === "error") {
        if (meta && meta.req) {
            msg = msg + meta.req.method + " " + meta.req.url;
        }
    }
    return winston.config.colorize(options.level) + " " + msg;
}
;
function getColorStatus(status) {
    var statusColor = "green";
    if (status >= 500) {
        statusColor = "red";
    }
    else if (status >= 400) {
        statusColor = "yellow";
    }
    else if (status >= 300) {
        statusColor = "cyan";
    }
    return chalk[statusColor](status);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;

//# sourceMappingURL=logger.js.map
