// import { Router } from "express";
// import { userController } from "./user.controller";

// let router = Router();

// // router.get("/", userController.getAll);
// router.get("/:id", userController.getById);

// export { router as userRouter} ;





import { Router } from "express";
import { userController } from "./user.controller";

let userRoutes = function(app) {
    let route = Router();
    app.use("/api/user", route);

    route.get("/", userController.getAll);
    route.get("/:id", userController.getById);

};

export { userRoutes }