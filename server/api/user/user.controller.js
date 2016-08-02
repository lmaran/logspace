"use strict";
var user_service_1 = require("./user.service");
var controller = {
    getAll: function (req, res) {
        return user_service_1.userService.getAll(function (err, users) {
            // if(err) { return handleError(res, err); }
            res.status(200).json(users);
        });
        // res.status(200).json([{}]);
    },
    getById: function (req, res, next) {
        var userId = req.params.id;
        // console.log(userId);
        user_service_1.userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
    },
};
exports.userController = controller;

//# sourceMappingURL=user.controller.js.map
