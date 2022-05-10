import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";

import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import { INotification } from "../../interfaces/notification";
import Notification from "../UI/Notification/Notification";
import classes from "./Login.module.scss";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const response: SignInResponse | undefined = await signIn<"credentials">("credentials", { redirect: false, email, password });

    if (response && response.error) {
      setLoading(false);
      setNotification({ error: response.error });
    } else {
      router.replace("/");
    }
  };

  return (
    <section className={classes.login}>
      <div className={classes.header}>Logowanie</div>
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
        {loading ? <Button disabled={true}>Trwa logowanie...</Button> : <Button>Zaloguj</Button>}
      </Form>
    </section>
  );
};

export default Login;
