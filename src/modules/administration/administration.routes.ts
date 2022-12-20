import { Router } from "express";
import verify from "../../middlewares/jwtAuth";
import * as administrationController from "./administration.controller";

const routes = Router();

routes.post("/", verify, administrationController.createRole);
routes.put("/:id", verify, administrationController.updateRole);

export default routes;
