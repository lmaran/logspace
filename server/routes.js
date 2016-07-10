"use strict";
var express_1 = require("express");
var environment_1 = require("./config/environment");
var userController_1 = require("./api/user/userController");
var logoutController_1 = require("./api/user/logout/logoutController");
var path = require("path");
var userRoutes_1 = require("./api/user/userRoutes");
var loginService_1 = require("./api/user/login/loginService");
var errors = require("./components/errors");
// const auth = require("./api/user/login/loginService");
var router = express_1.Router();
// router.get("/", userCtrl.getAll);
// API routes
router.get("/api/users/checkEmail/:email", userController_1.default.checkEmail);
router.use("/api/users", userRoutes_1.default);
// RPC routes
router.post("/login/", require("./api/user/login/local/loginLocalController").authenticate);
router.get("/logout", loginService_1.default.isAuthenticated(), logoutController_1.default.logout);
// router.get("/me", auth.isAuthenticated(), require("./api/user/userController").me);
router.post("/me/changepassword", loginService_1.default.isAuthenticated(), userController_1.default.changePassword);
// server-side views
router.get("/", function (req, res) { res.render("home/home", { user: req.user }); });
router.get("/contact", function (req, res) { res.render("contact/contact", { user: req.user }); });
router.get("/login", function (req, res) { res.render("user/login"); });
router.get("/register", function (req, res) { res.render("user/register", { email: req.query.email }); });
router.get("/activate/:id", userController_1.default.activateUser);
router.post("/activate/:id", userController_1.default.saveActivationData);
router.get("/changePassword", loginService_1.default.isAuthenticated(), function (req, res) { res.render("user/changePassword", { user: req.user }); });
// client-side views
router.get("/admin", function (req, res) { res.sendFile(path.resolve(path.join(environment_1.default.root, "client/index.html"))); });
router.get("/admin|/admin/*", function (req, res) { res.sendFile(path.resolve(path.join(environment_1.default.root, "client/index.html"))); });
// All undefined asset or api routes should return a 404
router.get("/:url(api|auth|components|app|bower_components|assets)/*", errors[404]);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;

//# sourceMappingURL=routes.js.map
