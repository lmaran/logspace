import { Application } from "express";
import userRoutes from "./api/user/user.routes";
import homeRoutes from "./api/home/home.routes";
import adminRoutes from "./api/admin/admin.routes";

let allRoutes = function(app: Application) {
    // API routes
    userRoutes(app);

    // server-side views
    homeRoutes(app);

    // client-side views
    adminRoutes(app);
};

export default allRoutes;