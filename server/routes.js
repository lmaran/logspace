"use strict";
var express_1 = require("express");
var user_routes_1 = require("./api/user/user.routes");
var router = express_1.Router();
router.use("/api/user", user_routes_1.userRouter);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;

//# sourceMappingURL=routes.js.map
