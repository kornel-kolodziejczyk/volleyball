import { FC, FormEvent, useRef, useState } from "react";

import { AiFillDelete } from "react-icons/ai";
import Button from "../UI/Button/Button";
import { IGame } from "../../models/Game";
import { INotification } from "../../interfaces/notification";
import { IUser } from "../../models/User";
import Notification from "../UI/Notification/Notification";
import axios from "axios";
import classes from "./CreateGame.module.scss";

interface Props {
  users: (IUser & { _id: string })[];
}

const CreateGame: FC<Props> = ({ users }) => {
  const [addedUsers, setAddedUsers] = useState<typeof users>([]);
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const userRef = useRef<HTMLSelectElement>(null);

  const addGameHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post<IGame & { _id: string }>("/api/games", { game: { date, link, users: addedUsers.map((addedUser) => addedUser._id) } });
      window.location.assign(`/games/${data._id}`);
    } catch (error) {
      setNotification({ error: "Nie udało się dodać meczu" });
    }
    setLoading(false);
  };

  const addUserHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userToAdd = users.find((user) => user._id === userRef.current?.value);

    if (userToAdd) {
      const userIsAdded = addedUsers.find((user) => user._id === userToAdd._id);
      if (!userIsAdded) {
        setAddedUsers((prevAddedUsers) => [...prevAddedUsers, { ...userToAdd }]);
      }
    }
  };

  const removeUserHandler = (_id: string) => {
    setAddedUsers((prevAddedUsers) => prevAddedUsers.filter((user) => user._id !== _id));
  };

  return (
    <div className={classes.createGame}>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <div className={classes.users}>
        <div className={classes.header}>Lista zawodników:</div>
        <ul>
          {addedUsers.map((user, index) => (
            <li key={user._id}>
              {`${index + 1}. ${user.name}`}
              <AiFillDelete onClick={() => removeUserHandler(user._id)} />
            </li>
          ))}
        </ul>
        <form onSubmit={addUserHandler}>
          <select ref={userRef}>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
          <Button>Dodaj zawodnika</Button>
        </form>
      </div>
      {addedUsers.length > 0 && (
        <div className={classes.actions}>
          <form onSubmit={addGameHandler}>
            <input defaultValue={date} value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
            <input value={link} onChange={(e) => setLink(e.target.value)} type="text" placeholder="Link do filmu" required />
            {loading ? <Button disabled>Dodawanie meczu...</Button> : <Button>Dodaj mecz</Button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
