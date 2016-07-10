"use strict";
var path = require("path");
var _ = require("lodash");
var common = {
    env: process.env.NODE_ENV,
    // Root path of server
    root: path.normalize(__dirname + "/../../.."),
    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: "node-fullstack-secret"
    },
    mongo: {
        options: {
            db: {}
        }
    },
    rollbarToken: "c40dd41c292340419923230eed1d0d61",
};
var envs = require("./development");
var config = _.merge(common, envs.settings || {});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;

//# sourceMappingURL=index.js.map
