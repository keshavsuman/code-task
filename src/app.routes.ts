import { Router } from "express";
import verify from "./middlewares/jwtAuth";
import userRouter from "./modules/user/user.routes";

const router = Router();

router.use("/user", userRouter);

// Writing for demonstaration only
router.use("/manager", verify([]), (req, res) => {
  console.log("you are in manager controller");
});

router.use("/employee", verify([]), (req, res) => {
  console.log("you are in manager employee");
});

router.use("/visitor", verify([]), (req, res) => {
  console.log("you are in manager visitor");
});

export default router;
