import { Router } from "express";
import { userController } from "./user.controller";

let router = Router();

router.get("/", userController.getAll);

export { router as userRouter} ;