"use strict";
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var router = express_1.Router();
exports.userRouter = router;
router.get("/", user_controller_1.userController.getAll);
router.get("/:id", user_controller_1.userController.getById);

//# sourceMappingURL=user.routes.js.map
