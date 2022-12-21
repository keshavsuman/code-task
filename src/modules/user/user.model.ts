import { Schema, model, Document } from "mongoose";
import { generateHash } from "./user.service";

export enum Role {
  Admin = "admin",
  Manager = "manager",
  Employee = "employee",
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
}

const userSchema: Schema = new Schema<User>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.Employee,
  },
});

userSchema.pre("save", function (next) {
  this.password = generateHash(this.password);
  next();
});

export default model<User>("user", userSchema);
