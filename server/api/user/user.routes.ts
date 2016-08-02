import { Router } from "express";
import { userController } from "./user.controller";

let router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);

export { router as userRouter} ;