import { Router } from "express";
import verify from "../../middlewares/jwtAuth";
import * as administrationController from "./administration.controller";

const routes = Router();

routes.post("/", verify(["admin"]), administrationController.createRole);
routes.put("/:id", verify(["admin"]), administrationController.updateRole);

export default routes;
