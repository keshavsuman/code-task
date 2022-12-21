import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jsonwebtoken from "jsonwebtoken";
import { getModulesByRole } from "../modules/administration/administration.service";

const verify =
  (allowedRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(httpStatus.UNAUTHORIZED).send({
        message: "Unauthorised",
      });
    } else {
      const bearer = authorization.split(" ");
      if (bearer[0] !== "Bearer") {
        res.status(httpStatus.UNAUTHORIZED).send({
          message: "Unauthorised",
        });
      } else {
        const token = bearer[1];
        const user: any = jsonwebtoken.verify(token, process.env.JWT_Token!);
        const modules = await getModulesByRole(user.role);
        const permissions = [...allowedRights, ...modules];
        const moduleRoute = req.url.split("/")[3];
        if (permissions.includes(moduleRoute)) {
          res.set("userId", user._id);
          res.set("firstName", user.firstName);
          res.set("lastName", user.lastName);
          res.set("email", user.email);
          next();
        } else {
          res.status(httpStatus.UNAUTHORIZED).send({
            messsage: "You are not allowed to access this API",
          });
        }
      }
    }
  };

export default verify;
