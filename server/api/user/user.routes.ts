import userController from "./user.controller";

let userRoutes = function(app) {
    app.get("/api/user", userController.getAll);
    app.get("/api/user/:id", userController.getById);
};

export default userRoutes;