import { AiOutlineHeart, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FC, FormEvent, useState } from "react";

import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import { INotification } from "../../interfaces/notification";
import Notification from "../UI/Notification/Notification";
import axios from "axios";
import classes from "./CreateUser.module.scss";

const CreateUser: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [notification, setNotification] = useState<INotification | null>(null);
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("male");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/users/create", { email, password, name, sex });
      setEmail("");
      setName("");
      setPassword("");
      setSex("male");
      setNotification({ success: "Dodano użytkownika." });
    } catch (error) {
      setNotification({ error: "Nie udało się dodać użytkownika!" });
    }
    setLoading(false);
  };

  return (
    <div className={classes.createUser}>
      <div className={classes.header}>Dodawanie użytkownika</div>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <Form onSubmit={submitHandler}>
        <div>
          <AiOutlineUser size={26} />
          <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <AiOutlineLock size={26} />
          <input type="password" placeholder="Hasło" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <AiOutlineHeart size={26} />
          <input type="name" placeholder="Imię i nazwisko" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <select value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
        {loading ? <Button disabled={true}>Dodawanie użytkownika...</Button> : <Button>Dodaj użytkownika</Button>}
      </Form>
    </div>
  );
};

export default CreateUser;
