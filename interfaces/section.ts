import { IScore } from "../models/Score";

export interface ISection extends Partial<Pick<IScore, "serves" | "attacks" | "receptions" | "blocks">> {}
