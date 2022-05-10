import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, verifyPassword } from "../../lib/auth";

import Game from "../../models/Game";
import S3 from "aws-sdk/clients/s3";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.s3_accessKeyId,
  secretAccessKey: process.env.s3_sercetAccessKey,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(401).json({ message: `Metoda ${req.method} jest niedozwolona` });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Brak dostępu!" });
  }

  const { currentPassword, newPassword, file } = req.body;

  await dbConnect();
  const user = await User.findById(session.user._id);

  if (!user) {
    return res.status(404).json({ error: "Nie znaleziono użytkownika." });
  }

  const passwordsAreEqual = await verifyPassword(currentPassword, user.password);

  if (!passwordsAreEqual) {
    return res.status(403).json({ error: "Nieprawidłowe hasło." });
  }

  if (newPassword) {
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
  }

  let url;

  if (file) {
    if (user.image) {
      await s3.deleteObject({ Bucket: "volleyball-bucket", Key: user.image }).promise();
    }

    url = await s3.getSignedUrlPromise("putObject", { Bucket: "volleyball-bucket", Key: file, ACL: "public-read" });
    user.image = file;

    await res.unstable_revalidate("/");
    const games = await Game.find({ _id: { $in: user.scores } });
    await Promise.all(games.map(async (game) => await res.unstable_revalidate(`/games/${game._id}`)));
  }

  await user.save();
  res.status(200).json({ ...(newPassword && { message: "Zaktualizowano hasło" }), ...(file && { url }) });
};
