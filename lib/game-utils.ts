import Score, { IScore } from "../models/Score";
import User, { IUser } from "../models/User";

import Game from "../models/Game";
import { IPlayer } from "../interfaces/player";
import { Types } from "mongoose";
import dbConnect from "./dbConnect";

export const getGame = async (id: string) => {
  await dbConnect();
  const game = await Game.findById(id).populate<{ scores: [IScore & { _id: Types.ObjectId } & { user: { name: string; image: string; sex: string; scores: Types.ObjectId[] } }] }>({
    path: "scores",
    populate: { path: "user", select: "name image sex scores" },
  });

  if (!game) {
    return null;
  }

  return {
    _id: game._id.toString(),
    players: game.scores
      .map((score) => ({
        _id: score._id.toString(),
        name: score.user.name,
        image: score.user.image,
        sex: score.user.sex,
        games: score.user.scores.length,
        overall: score.overall,
        serves: score.serves,
        attacks: score.attacks,
        receptions: score.receptions,
        blocks: score.blocks,
      }))
      .sort((a, b) => b.overall - a.overall),
  };
};

export const getGames = async () => {
  await dbConnect();
  const games = await Game.find().select({ _id: 1, date: 1, link: 1 }).sort("-date");
  return games;
};

export const getUsers = async (): Promise<IUser[]> => {
  await dbConnect();
  const users = await User.find().select("name");
  return users;
};

export const getUser = async (_id: string) => {
  await dbConnect();
  const user = await User.findById(_id);
  
  if (!user) {
    throw new Error("Nie odnaleziono użytkownika");
  }
  return { image: user.image, sex: user.sex };
};

export const getPlayers = async () => {
  await dbConnect();
  const scores = await Score.find()
    .populate<{ user: Pick<IUser, "name" | "sex" | "image"> & { _id: Types.ObjectId } }>("user", "name sex image")
    .populate<{ game: { _id: Types.ObjectId; date: Date } }>("game", "date");

  const players: Omit<IPlayer, "game" | "user">[] = [];

  scores.forEach((score) => {
    const playerIndex: number = players.findIndex((player) => player._id === score.user._id.toString());

    if (playerIndex > -1) {
      players[playerIndex].games++;
      players[playerIndex].overall += score.overall;
      players[playerIndex].serves.aces += score.serves.aces;
      players[playerIndex].serves.correct += score.serves.correct;
      players[playerIndex].serves.faults += score.serves.faults;
      players[playerIndex].serves.overall += score.serves.overall;
      players[playerIndex].attacks.spikes += score.attacks.spikes;
      players[playerIndex].attacks.correct += score.attacks.correct;
      players[playerIndex].attacks.faults += score.attacks.faults;
      players[playerIndex].attacks.overall += score.attacks.overall;
      players[playerIndex].receptions.inaccurates += score.receptions.inaccurates;
      players[playerIndex].receptions.correct += score.receptions.correct;
      players[playerIndex].receptions.faults += score.receptions.faults;
      players[playerIndex].receptions.overall += score.receptions.overall;
      players[playerIndex].blocks.outs += score.blocks.outs;
      players[playerIndex].blocks.correct += score.blocks.correct;
      players[playerIndex].blocks.points += score.blocks.points;
      players[playerIndex].blocks.overall += score.blocks.overall;
      players[playerIndex].chart!.push({ date: score.game.date.toLocaleDateString("pl-PL", { year: "numeric", month: "short", day: "numeric" }), overall: score.overall });
    } else {
      players.push({
        _id: score.user._id.toString(),
        sex: score.user.sex,
        name: score.user.name,
        image: score.user.image,
        chart: [{ date: score.game.date.toLocaleDateString("pl-PL", { year: "numeric", month: "short", day: "numeric" }), overall: score.overall }],
        games: 1,
        overall: score.overall,
        serves: score.serves,
        attacks: score.attacks,
        receptions: score.receptions,
        blocks: score.blocks,
      });
    }
  });

  players.forEach((player) => {
    player.overall = player.overall / player.games;
    player.serves.overall = player.serves.overall / player.games;
    player.attacks.overall = player.attacks.overall / player.games;
    player.receptions.overall = player.receptions.overall / player.games;
    player.blocks.overall = player.blocks.overall / player.games;
  });

  return players.sort((a, b) => b.overall - a.overall);
};

const sumObjects = (objectA: { [key: string]: number }, objectB: { [key: string]: number }) => {
  const keys = Object.keys(objectA);
  const sumedObject = { ...objectA };
  keys.forEach((key) => {
    sumedObject[key] += objectB[key];
  });
  return sumedObject;
};

export const getStats = async () => {
  await dbConnect();

  const scores = await Score.find().populate<{ user: { sex: string } }>("user", "sex").select("serves attacks receptions blocks").lean();

  const stats = scores.reduce(
    (sum, score) => {
      const sex = score.user.sex as keyof typeof sum;
      return {
        ...sum,
        [sex]: {
          serves: sumObjects(sum[sex].serves, score.serves),
          attacks: sumObjects(sum[sex].attacks, score.attacks),
          receptions: sumObjects(sum[sex].receptions, score.receptions),
          blocks: sumObjects(sum[sex].blocks, score.blocks),
          games: ++sum[sex].games,
        },
      };
    },
    {
      male: {
        serves: { correct: 0, aces: 0, faults: 0, overall: 0 },
        attacks: { correct: 0, spikes: 0, faults: 0, overall: 0 },
        receptions: { correct: 0, inaccurates: 0, faults: 0, overall: 0 },
        blocks: { correct: 0, outs: 0, points: 0, overall: 0 },
        games: 0,
      },
      female: {
        serves: { correct: 0, aces: 0, faults: 0, overall: 0 },
        attacks: { correct: 0, spikes: 0, faults: 0, overall: 0 },
        receptions: { correct: 0, inaccurates: 0, faults: 0, overall: 0 },
        blocks: { correct: 0, outs: 0, points: 0, overall: 0 },
        games: 0,
      },
    }
  );

  const all = {
    serves: sumObjects(stats.male.serves, stats.female.serves),
    attacks: sumObjects(stats.male.attacks, stats.female.attacks),
    receptions: sumObjects(stats.male.receptions, stats.female.receptions),
    blocks: sumObjects(stats.male.blocks, stats.female.blocks),
    games: stats.male.games + stats.female.games,
  };

  return { ...stats, all };
};
