import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.use("/signin", userController.signin);
router.use("/signup", userController.signup);

export default router;
