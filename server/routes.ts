import { Router, Request, Response } from "express";
import config from "./config/environment";
import userController from "./api/user/userController";
import logoutController from "./api/user/logout/logoutController";
import loginLocalController from "./api/user/login/local/loginLocalController";
import * as path from "path";
import userRoutes from "./api/user/userRoutes";
import auth from "./api/user/login/loginService";

const errors = require("./components/errors");
// const auth = require("./api/user/login/loginService");

let router = Router();
// router.get("/", userCtrl.getAll);



    // API routes
    router.get("/api/users/checkEmail/:email",  userController.checkEmail);
    router.use("/api/users", userRoutes);

    // RPC routes
    router.post("/login/", loginLocalController.authenticate);
    router.get("/logout", auth.isAuthenticated(), logoutController.logout);
    // router.get("/me", auth.isAuthenticated(), require("./api/user/userController").me);
    router.post("/me/changepassword", auth.isAuthenticated(), userController.changePassword);

    // server-side views
    router.get("/", function(req: Request, res: Response) { res.render("home/home", { user: req.user }); });
    router.get("/contact", function(req: Request, res: Response) { res.render("contact/contact", { user: req.user }); });
    router.get("/login", function(req: Request, res: Response) { res.render("user/login"); });
    router.get("/register", function(req: Request, res: Response) { res.render("user/register", { email: req.query.email }); });

    router.get("/activate/:id", userController.activateUser);
    router.post("/activate/:id", userController.saveActivationData);

    router.get("/changePassword", auth.isAuthenticated(), function(req: Request, res: Response){res.render("user/changePassword", {user: req.user}); });

    // client-side views

    router.get("/admin", function(req: Request, res: Response) {res.sendFile(path.resolve(path.join(config.root, "client/index.html"))); });
    router.get("/admin|/admin/*", function(req: Request, res: Response) {res.sendFile(path.resolve(path.join(config.root, "client/index.html"))); });

    // All undefined asset or api routes should return a 404
    router.get("/:url(api|auth|components|app|bower_components|assets)/*", errors[404]);


export default router;
