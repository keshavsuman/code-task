import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "./user.model";
import * as userService from "./user.service";

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    let user: User | null = await userService.getUserByEmail(email);
    if (!user) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "User doesn't exists",
        status: httpStatus.BAD_REQUEST,
      });
    } else {
      if (userService.comparePassword(password, user.password!)) {
        res.status(httpStatus.OK).send({
          message: "User login successfully",
          status: httpStatus.OK,
          data: {
            user,
            token: userService.generateAuthenticationToken(user.toObject()),
          },
        });
      } else {
        res.status(httpStatus.BAD_REQUEST).send({
          message: "Password doesn't matched",
          status: httpStatus.BAD_REQUEST,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    let user: User | null = await userService.getUserByEmail(email);
    const names: [string] = name.split(" ");
    const createUserDto: any = {
      firstName: names.splice(0, 1).pop(),
      lastName: names.join(" "),
      email: email,
      password: password,
    };
    if (!user) {
      let user = await userService.createUser(createUserDto);
      res.status(httpStatus.OK).send({
        data: user,
        message: "User signup successfully",
        status: httpStatus.CREATED,
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "User already exists",
        status: httpStatus.BAD_REQUEST,
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
}
