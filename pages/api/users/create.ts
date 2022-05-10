import { NextApiRequest, NextApiResponse } from "next";

import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { hashPassword } from "../../../lib/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(401).json({ message: `Metoda ${req.method} jest niedozwolona` });
  }

  const session = await getSession({ req });

  if (!session || !session.user.admin) {
    return res.status(401).json({ message: "Brak dostępu!" });
  }

  const { email, password, name, sex } = req.body;

  await dbConnect();

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ message: "Podany e-mail jest zajęty." });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ date: new Date(), email, password: hashedPassword, name, sex });
  await res.unstable_revalidate("/");
  await res.unstable_revalidate("/statistics");
  await user.save();
  res.status(201).json({ message: "Użytkownik został dodany" });
};
