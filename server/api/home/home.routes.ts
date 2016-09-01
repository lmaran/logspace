import homeController from "./home.controller";

let routes = function(app) {
    app.get("/", homeController.index);
    // app.get("/api/user/:id", homeController.getById);
};

export default routes;