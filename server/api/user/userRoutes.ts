import controller from "./userController";
import auth from "./login/loginService";
import { Router } from "express";

const router = Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.post("/createpublicuser", controller.createPublicUser);
router.get("/", auth.hasRole("admin"), controller.getAll);
router.get("/\\$count", controller.getAll);
router.get("/:id", auth.hasRole("admin"), controller.getById);
router.get("/me", auth.isAuthenticated(), controller.me);
router.put("/me/changepassword", auth.isAuthenticated(), controller.changePassword);
router.put("/", auth.isAuthenticated(), controller.update);
router.delete("/:id", auth.hasRole("admin"), controller.remove);

export default router;
