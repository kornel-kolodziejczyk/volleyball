import { Model, Schema, Types, model, models } from "mongoose";

export interface IScore {
  attacks: { correct: number; spikes: number; faults: number; overall: number };
  blocks: { correct: number; points: number; outs: number; overall: number };
  game: Types.ObjectId;
  overall: number;
  receptions: { correct: number; inaccurates: number; faults: number; overall: number };
  serves: { correct: number; aces: number; faults: number; overall: number };
  user: Types.ObjectId;
}

const scoreSchema: Schema = new Schema<IScore>({
  attacks: { correct: { type: Number, default: 0 }, spikes: { type: Number, default: 0 }, faults: { type: Number, default: 0 }, overall: { type: Number, default: 0 } },
  blocks: { correct: { type: Number, default: 0 }, points: { type: Number, default: 0 }, outs: { type: Number, default: 0 }, overall: { type: Number, default: 0 } },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  overall: { type: Number, default: 0 },
  receptions: { correct: { type: Number, default: 0 }, inaccurates: { type: Number, default: 0 }, faults: { type: Number, default: 0 }, overall: { type: Number, default: 0 } },
  serves: { correct: { type: Number, default: 0 }, aces: { type: Number, default: 0 }, faults: { type: Number, default: 0 }, overall: { type: Number, default: 0 } },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Score = (models.Score as Model<IScore>) || model<IScore>("Score", scoreSchema);
export default Score;
