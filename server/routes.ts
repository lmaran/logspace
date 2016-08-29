import userRoutes from "./api/user/user.routes";

let allRoutes = function(app) {
    userRoutes(app);
};

export default allRoutes;