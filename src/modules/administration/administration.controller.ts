import httpStatus from "http-status";
import { Request, Response } from "express";
import { Types } from "mongoose";
import * as roleService from "./administration.service";

export async function createRole(req: Request, res: Response) {
  try {
    const createRoleDto = {
      name: req.body.name,
      modules: req.body.modules,
    };
    const role = await roleService.createRole(createRoleDto);
    res.status(httpStatus.CREATED).send({
      data: role,
      status: httpStatus.CREATED,
      message: "Role has ben created",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}

export async function updateRole(req: Request, res: Response) {
  try {
    const roleId: Types.ObjectId = new Types.ObjectId(req.params.id);
    const role = await roleService.updateRole(roleId, req.body);
    res.status(httpStatus.OK).send({
      data: role,
      status: httpStatus.OK,
      message: "Role has been updated",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}
