"use strict";
// import { userService } from "./user.service";
var userService2 = require("./user.service");
var userService = userService2.userService;
// console.log(userService);
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
        userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
    }
};
exports.userController = controller;

//# sourceMappingURL=user.controller.js.map
