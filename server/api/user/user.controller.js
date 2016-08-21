"use strict";
var user_service_1 = require("./user.service");
// let userService2 = require("./user.service");
// let userService = userService2.userService;
var controller = {
    // getAll: function (req: Request, res: Response) {
    //     return userService.getAll(function (err, users) {
    //         // if(err) { return handleError(res, err); }
    //         res.status(200).json(users);
    //     });
    //     // res.status(200).json([{}]);
    // },
    getById: function (req, res, next) {
        var userId = req.params.id;
        user_service_1.userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
    }
};
exports.userController = controller;

//# sourceMappingURL=user.controller.js.map
