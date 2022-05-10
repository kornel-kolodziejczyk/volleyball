import { Model, Schema, Types, model, models } from "mongoose";

export interface IUser {
  admin: boolean;
  date: Date;
  email: string;
  image: string;
  name: string;
  password: string;
  scores: Types.ObjectId[];
  sex: "male" | "female";
}

const userSchema: Schema = new Schema({
  admin: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "" },
  name: { type: String, required: true },
  password: { type: String, required: true },
  scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
  sex: { type: String, enum: ["male", "female"] },
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);
export default User;
