import { Model, Schema, Types, model, models } from "mongoose";

export interface IGame {
  date: Date;
  link: string;
  scores: Types.ObjectId[];
}

const gameSchema: Schema = new Schema({
  date: { type: Date, required: true },
  link: { type: String, required: true },
  scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
});

const Game = (models.Game as Model<IGame>) || model<IGame>("Game", gameSchema);
export default Game;
