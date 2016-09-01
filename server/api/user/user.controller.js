"use strict";
var user_service_1 = require("./user.service");
var controller = {
    getAll: function (req, res, next) {
        return user_service_1.default.getAll(function (err, users) {
            // if(err) { return handleError(res, err); }
            res.status(200).json(users);
        });
        // res.json([{name: "aaa"}]);
    },
    getById: function (req, res, next) {
        var userId = req.params.id;
        user_service_1.default.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
        // res.json({name: "aaa"});
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = controller;

//# sourceMappingURL=user.controller.js.map
