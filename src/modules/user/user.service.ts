import { Types } from "mongoose";
import userModel, { User } from "./user.model";
import jsonwebtoken from "jsonwebtoken";

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
