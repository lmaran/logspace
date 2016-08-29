"use strict";
var user_service_1 = require("./user.service");
var userController = {
    getAll: function (req, res, next) {
        return user_service_1.userService.getAll(function (err, users) {
            // if(err) { return handleError(res, err); }
            res.status(200).json(users);
        });
        // res.json([{name: "aaa"}]);
    },
    getById: function (req, res, next) {
        var userId = req.params.id;
        // console.log(userId);
        user_service_1.userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
        // res.json({name: "aaa"});
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userController;

//# sourceMappingURL=user.controller.js.map
