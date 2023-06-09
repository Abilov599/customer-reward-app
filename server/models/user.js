import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

export const Users = model("users", userSchema);
