import { Document, model, Schema } from "mongoose"

export interface IUser extends Document {
  email: string
  role: "admin" | "regular"
}

export const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "regular"],
    default: "regular",
  },
})

export const User = model<IUser>("User", userSchema)
