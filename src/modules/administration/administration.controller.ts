import httpStatus from "http-status";
import { Request, Response } from "express";
import { Types } from "mongoose";

export async function createRole(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}

export async function updateRole(req: Request, res: Response) {
  try {
    const roleId: Types.ObjectId = new Types.ObjectId(req.params.id);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}
