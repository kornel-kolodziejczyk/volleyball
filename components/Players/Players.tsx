import { FC, useRef, useState } from "react";

import Button from "../UI/Button/Button";
import { IPlayer } from "../../interfaces/player";
import Player from "../Player/Player";
import Sorter from "../UI/Sorter/Sorter";
import classes from "./Players.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  players: IPlayer[];
}

const Players: FC<Props> = (props) => {
  const [players, setPlayers] = useState(props.players);
  const { data: session } = useSession();
  const filterRef = useRef<HTMLSelectElement>(null);
  const orderRef = useRef<HTMLSelectElement>(null);
  const router = useRouter();
  const sortRef = useRef<HTMLSelectElement>(null);

  const clickHandler = () => router.push("/users/create");

  const sortHandler = () => {
    let filteredPlayers = [...props.players];

    if (filterRef.current?.value !== "all") {
      filteredPlayers = filteredPlayers.filter((player) => player.sex === filterRef.current?.value);
    }

    if (sortRef.current?.value === "overall") {
      setPlayers(filteredPlayers.sort((a, b) => (orderRef.current?.value === "descending" ? b.overall - a.overall : a.overall - b.overall)));
    } else if (sortRef.current?.value === "serves") {
      setPlayers(filteredPlayers.sort((a, b) => (orderRef.current?.value === "descending" ? b.serves.overall - a.serves.overall : a.serves.overall - b.serves.overall)));
    } else if (sortRef.current?.value === "attacks") {
      setPlayers(filteredPlayers.sort((a, b) => (orderRef.current?.value === "descending" ? b.attacks.overall - a.attacks.overall : a.attacks.overall - b.attacks.overall)));
    } else if (sortRef.current?.value === "receptions") {
      setPlayers(filteredPlayers.sort((a, b) => (orderRef.current?.value === "descending" ? b.receptions.overall - a.receptions.overall : a.receptions.overall - b.receptions.overall)));
    } else if (sortRef.current?.value === "blocks") {
      setPlayers(filteredPlayers.sort((a, b) => (orderRef.current?.value === "descending" ? b.blocks.overall - a.blocks.overall : a.blocks.overall - b.blocks.overall)));
    }
  };

  return (
    <>
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
        {session && session.user.admin && <Button onClick={clickHandler}>Dodaj zawodnika</Button>}
      </Sorter>
      <div className={classes.players}>
        {players.map((player, index) => (
          <Player key={player._id} player={{ ...player, index }} />
        ))}
      </div>
    </>
  );
};

export default Players;
