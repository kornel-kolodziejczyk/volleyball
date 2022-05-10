import Button from "../UI/Button/Button";
import { FC } from "react";
import Header from "../UI/Header/Header";
import { IGame } from "../../models/Game";
import Image from "next/image";
import classes from "./Games.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  games: (Omit<IGame, "scores"> & { _id: string })[];
}

const Games: FC<Props> = ({ games }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className={classes.games}>
      {session && <Button onClick={() => router.push("/games/create")}>Dodaj mecz</Button>}

      <div className={classes.content}>
        {games.map((game) => (
          <div key={game._id} className={classes.game}>
            <Header>{new Date(game.date).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" })}</Header>
            <div className={classes.game_content}>
              <Image src={`https://img.youtube.com/vi/${game.link}/mqdefault.jpg`} width="480px" height="360px" layout="responsive" />
              <a className={classes.button} target="_blank" href={`https://www.youtube.com/watch?v=${game.link}`} rel="noopener noreferrer">
                Obejrzyj mecz
              </a>
              <hr />
              <button className={classes.button} onClick={() => router.push(`/games/${game._id}`)}>
                Otwórz statystyki
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
