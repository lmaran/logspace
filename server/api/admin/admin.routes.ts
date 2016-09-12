import adminController from "./admin.controller";

let routes = function(app) {
    app.get("/admin|/admin/*", adminController.index);
};

export default routes;