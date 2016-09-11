"use strict";
var controller = {
    index: function (req, res) {
        // res.send("aabb");
        res.render("home/home", { user: req.user });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = controller;

//# sourceMappingURL=home.controller.js.map
