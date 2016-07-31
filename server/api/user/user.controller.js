"use strict";
var user_service_1 = require("./user.service");
var controller = {};
exports.userController = controller;
controller.getAll = function (req, res) {
    return user_service_1.userService.getAll(function (err, users) {
        // if(err) { return handleError(res, err); }
        res.status(200).json(users);
    });
};

//# sourceMappingURL=user.controller.js.map
