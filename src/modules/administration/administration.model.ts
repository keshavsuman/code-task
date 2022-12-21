import { Schema, model, Document } from "mongoose";

export interface Administration extends Document {
  role: string;
  modules: string[];
}

const administrationSchema: Schema = new Schema<Administration>(
  {
    role: {
      type: String,
    },
    modules: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default model<Administration>("administration", administrationSchema);
