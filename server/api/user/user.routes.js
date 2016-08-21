// import { Router } from "express";
// import { userController } from "./user.controller";
"use strict";
// let router = Router();
// // router.get("/", userController.getAll);
// router.get("/:id", userController.getById);
// export { router as userRouter} ;
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var userRoutes = function (app) {
    var route = express_1.Router();
    app.use("/api/user", route);
    console.log(user_controller_1.userController.getById);
    route.get("/:id", user_controller_1.userController.getById);
};
exports.userRoutes = userRoutes;

//# sourceMappingURL=user.routes.js.map
