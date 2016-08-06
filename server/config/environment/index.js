// process.env.NODE_ENV = process.env.NODE_ENV || "development";
"use strict";
var path = require("path");
var _ = require("lodash");
var development_1 = require("./development");
var staging_1 = require("./staging");
var production_1 = require("./production");
var test_1 = require("./test");
var envConfig = {
    development: development_1.default,
    staging: staging_1.default,
    production: production_1.default,
    test: test_1.default
};
var common = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 1410,
    root: path.normalize(__dirname + "/../../.."),
    mongo: {
        options: {
            db: {}
        }
    },
    rollbarToken: "c40dd41c292340419923230eed1d0d61",
};
var config = _.merge(common, envConfig[common.env]);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;

//# sourceMappingURL=index.js.map
