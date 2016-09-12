"use strict";
var path = require("path");
var environment_1 = require("../../config/environment");
var controller = {
    index: function (req, res) {
        // console.log(path.resolve(path.join(config.root, "client/index.html")));
        res.sendFile(path.resolve(path.join(environment_1.default.root, "client/index.html")));
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = controller;

//# sourceMappingURL=admin.controller.js.map
