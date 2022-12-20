import { Schema, model } from "mongoose";

const administrationSchema: Schema = new Schema(
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

export default model("administration", administrationSchema);
