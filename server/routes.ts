import { Router } from "express";
import { userRouter } from "./api/user/user.routes";

let router = Router();

router.use("/api/user", userRouter);

export default router;