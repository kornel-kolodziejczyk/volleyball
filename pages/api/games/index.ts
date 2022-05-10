import { NextApiRequest, NextApiResponse } from "next";

import Game from "../../../models/Game";
import { IPlayer } from "../../../interfaces/player";
import Score from "../../../models/Score";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user.admin) {
    return res.status(401).json({ message: "Brak dostępu" });
  }

  if (req.method === "POST") {
    const { date, users, link }: { date: Date; users: string[]; link: string } = req.body.game;
    await dbConnect();

    try {
      const game = new Game({ date, link });

      await Promise.all(
        users.map(async (user) => {
          const score = new Score({ user, game });
          await score.save();
          await User.findByIdAndUpdate(user, { $push: { scores: score } });
          game.scores.push(score._id);
        })
      );

      await game.save();
      await res.unstable_revalidate("/statistics");
      await res.unstable_revalidate("/games");
      await res.unstable_revalidate("/");
      res.status(200).json(game);
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "PATCH") {
    const { game } = req.body;

    await dbConnect();
    try {
      await Promise.all(
        game.players.map(async (player: IPlayer) => {
          const score = await Score.findById(player._id);
          if (score) {
            score.overall = player.overall;
            score.serves = player.serves;
            score.attacks = player.attacks;
            score.receptions = player.receptions;
            score.blocks = player.blocks;
            await score.save();
          }
        })
      );

      await res.unstable_revalidate("/statistics");
      await res.unstable_revalidate(`/games/${game._id}`);
      await res.unstable_revalidate("/");
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
