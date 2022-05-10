import { AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

import Container from "../../../UI/Container/Container";
import { FC } from "react";
import { IoMdStats } from "react-icons/io";
import Link from "next/link";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import classes from "./Navigation.module.scss";

const Navigation: FC = () => {
  const { data: session } = useSession();

  const logoutHandler = () => signOut();

  return (
    <nav className={classes.navigation}>
      <Container>
        <ul>
          <li>
            <AiOutlineTeam size={20}/>
            <Link href="/">ZAWODNICY</Link>
          </li>
          <li>
            <IoMdStats size={20}/>
            <Link href="/statistics">STATYSTYKI</Link>
          </li>
          <li>
            <MdOutlineSportsVolleyball size={20}/>
            <Link href="/games">MECZE</Link>
          </li>
          {session ? (
            <>
              <li>
                <AiOutlineUser size={20}/>
                <Link href="/profile">PROFIL</Link>
              </li>
              <li>
                <RiLogoutBoxLine size={20}/>
                <span onClick={logoutHandler}>WYLOGUJ</span>
              </li>
            </>
          ) : (
            <li className={classes.contact}>
              <RiLoginBoxLine size={20}/>
              <Link href="/login">ZALOGUJ</Link>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navigation;
