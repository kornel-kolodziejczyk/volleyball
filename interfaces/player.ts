import { IScore } from "../models/Score";
import { IUser } from "../models/User";

export interface IPlayer extends IScore, Pick<IUser, "sex" | "name" | "image"> {
  _id: string;
  chart?: [{ date: string; overall: number }];
  games: number;
}
