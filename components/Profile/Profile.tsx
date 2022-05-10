import { AiOutlineLock, AiOutlinePicture } from "react-icons/ai";
import { FC, FormEvent, useEffect, useRef, useState } from "react";

import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import { INotification } from "../../interfaces/notification";
import { IUser } from "../../models/User";
import Image from "next/image";
import Notification from "../UI/Notification/Notification";
import axios from "axios";
import classes from "./Profile.module.scss";
import { useRouter } from "next/router";

interface Props {
  user: Pick<IUser, "image" | "sex">;
}

const Profile: FC<Props> = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState<INotification | null>(null);
  const [image, setImage] = useState(user.image ? `${process.env.NEXT_PUBLIC_s3_bucketUrl}/${user.image}` : `/images/site/${user.sex}.jpg`);
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.update) {
      setNotification({ success: "Zaktualizowano profil" });
    }
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = imageRef.current?.files ? imageRef.current.files[0] : null;

    try {
      setLoading(true);
      const { data } = await axios.patch<{ url?: string }>("api/profile", { currentPassword, ...(newPassword && { newPassword }), ...(file && { file: file.name }) });

      if (file) {
        if (data.url) {
          await axios.put(data.url, file);
          window.location.assign("/profile?update=success");
        }
      } else {
        setNotification({ success: "Profil został zaktualizowany" });
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      setNotification({ error: "Nie udało się zaktualizować profilu" });
      setLoading(false);
    }
  };

  const setImageHandler = () => {
    const files = imageRef.current?.files;
    if (files?.length) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className={classes.profile}>
      <div className={classes.header}>Mój profil</div>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <Form onSubmit={submitHandler}>
        <Image src={image} width="140" height="140" layout="fixed" objectFit="cover" />
        <div>
          <AiOutlineLock size={26} />
          <input type="password" required min={7} placeholder="Aktualne hasło" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <AiOutlineLock size={26} />
          <input type="password" min={7} placeholder="Nowe hasło" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <AiOutlinePicture size={26} />
          <input type="file" ref={imageRef} accept=".jpg,.png,.jpeg" onChange={setImageHandler} />
          <input type="button" value={imageRef.current?.files?.length ? imageRef.current.files[0].name : "Wybierz plik"} onClick={() => imageRef.current?.click()} />
        </div>
        {loading ? <Button disabled>Aktualizowanie profilu...</Button> : <Button disabled={!(currentPassword && (newPassword || imageRef.current?.files?.length))}>Zapisz zmiany</Button>}
      </Form>
    </div>
  );
};

export default Profile;
