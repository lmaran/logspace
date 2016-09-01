import userController from "./user.controller";

let routes = function(app) {
    app.get("/api/user", userController.getAll);
    app.get("/api/user/:id", userController.getById);
};

export default routes;