import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "./user.model";
import * as userService from "./user.service";

export async function signin(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user: User = await userService.getUserByEmail(email);
    const names: [string] = name.split(" ");
    const createUserDto: any = {};
    res.status(httpStatus.OK).send({
      data: user,
      message: "User signup successfully",
      status: httpStatus.CREATED,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}

export async function signup(req: Request, res: Response) {}
