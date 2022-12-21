import { Types } from "mongoose";
import administrationModel from "./administration.model";

export async function createRole(createRoleDto: any): Promise<any> {
  return await administrationModel.create(createRoleDto);
}

export async function getModulesByRole(role: string): Promise<any> {
  return await administrationModel.findOne({ role }, { modules: 1 });
}

export async function updateRole(
  roleId: Types.ObjectId,
  updateBody: any
): Promise<any> {
  return await administrationModel.findByIdAndUpdate(roleId, updateBody);
}
