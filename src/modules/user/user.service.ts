import { Types } from "mongoose";
import userModel, { User } from "./user.model";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function getUserById(
  userId: Types.ObjectId
): Promise<User | null> {
  return await userModel.findById(userId);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await userModel.findOne({ email });
}

export function generateAuthenticationToken(user: any): string {
  return jsonwebtoken.sign(user, process.env.JWT_TOKEN!);
}

export async function createUser(createUserDto: any) {
  return await userModel.create(createUserDto);
}

/**
 * @description this function is used to compare password
 * @param {String} password
 * @param {String} hashpassword
 * @author Keshav suman
 * @returns {Boolean}
 */
export function comparePassword(
  password: string,
  hashpassword: string
): boolean {
  return bcrypt.compareSync(password, hashpassword);
}

/**
 * @description this function is used to hash password
 * @param {String} password
 * @author Keshav suman
 * @returns {String}
 */
export const generateHash = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
