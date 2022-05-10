import { FC, useRef, useState } from "react";

import Button from "../UI/Button/Button";
import { INotification } from "../../interfaces/notification";
import { IPlayer } from "../../interfaces/player";
import { ISection } from "../../interfaces/section";
import Notification from "../UI/Notification/Notification";
import Player from "../Player/Player";
import Sorter from "../UI/Sorter/Sorter";
import axios from "axios";
import classes from "./Game.module.scss";
import { updatePlayer } from "../utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  game: { _id: string; players: IPlayer[] };
}

const Games: FC<Props> = (props) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [game, setGame] = useState(props.game);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const { data: session } = useSession();
  const filterRef = useRef<HTMLSelectElement>(null);
  const orderRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  const filterPlayers = (player: IPlayer) => {
    if (filterRef.current?.value === "male") {
      return player.sex === "male";
    }

    if (filterRef.current?.value === "female") {
      return player.sex === "female";
    }

    return player;
  };

  const sortHandler = () => {
    let filteredGame = { ...game };

    if (sortRef.current?.value === "overall") {
      setGame({ ...filteredGame, players: filteredGame.players.sort((a, b) => (orderRef.current?.value === "descending" ? b.overall - a.overall : a.overall - b.overall)) });
    } else if (sortRef.current?.value === "serves") {
      setGame({ ...filteredGame, players: filteredGame.players.sort((a, b) => (orderRef.current?.value === "descending" ? b.overall - a.overall : a.overall - b.overall)) });
    } else if (sortRef.current?.value === "attacks") {
      setGame({
        ...filteredGame,
        players: filteredGame.players.sort((a, b) => (orderRef.current?.value === "descending" ? b.attacks.overall - a.attacks.overall : a.attacks.overall - b.attacks.overall)),
      });
    } else if (sortRef.current?.value === "receptions") {
      setGame({
        ...filteredGame,
        players: filteredGame.players.sort((a, b) => (orderRef.current?.value === "descending" ? b.receptions.overall - a.receptions.overall : a.receptions.overall - b.receptions.overall)),
      });
    } else if (sortRef.current?.value === "blocks") {
      setGame({
        ...filteredGame,
        players: filteredGame.players.sort((a, b) => (orderRef.current?.value === "descending" ? b.blocks.overall - a.blocks.overall : a.blocks.overall - b.blocks.overall)),
      });
    }
  };

  const saveHandler = async () => {
    setLoading(true);
    try {
      await axios.patch("/api/games", { game });
      router.reload();
    } catch (error) {
      setNotification({ error: "Nie udało się zapisać zmian." });
      setLoading(false);
    }
  };

  const updateHandler = (id: string, section: keyof ISection, item: string, value: number) => {
    setGame((prevGame) => {
      const players = prevGame.players.map((player) => (player._id === id ? updatePlayer(prevGame.players, player, section, item, value) : player));
      return { _id: prevGame._id, players };
    });
  };

  const button = loading ? <Button disabled={true}>Zapisuję...</Button> : editMode ? <Button onClick={saveHandler}>Zapisz</Button> : <Button onClick={() => setEditMode(true)}>Edycja</Button>;

  return (
    <div className={classes.game}>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <Sorter>
        <select ref={sortRef} onChange={sortHandler}>
          <option value={"overall"}>Ocena ogólna</option>
          <option value={"serves"}>Zagrywka</option>
          <option value={"attacks"}>Atak</option>
          <option value={"receptions"}>Przyjęcie</option>
          <option value={"blocks"}>Blok</option>
        </select>
        <select ref={orderRef} onChange={sortHandler}>
          <option value="descending">Malejąco</option>
          <option value="ascending">Rosnąco</option>
        </select>
        <select ref={filterRef} onChange={sortHandler}>
          <option value="all">Wszyscy</option>
          <option value="male">Mężczyźni</option>
          <option value="female">Kobiety</option>
        </select>
        {session && session.user.admin && button}
      </Sorter>

      <div className={classes.players}>
        {game.players.filter(filterPlayers).map((player, index) => (
          <Player
            key={player._id}
            player={{ ...player, index }}
            editMode={editMode}
            onUpdate={(id: string, section: "serves" | "attacks" | "receptions" | "blocks", item: string, value: number) => updateHandler(id, section, item, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
