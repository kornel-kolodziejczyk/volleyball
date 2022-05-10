import Container from "../components/UI/Container/Container";
import Head from "next/head";
import type { NextPage } from "next";
import Players from "../components/Players/Players";
import { getPlayers } from "../lib/game-utils";

interface Props {
  players: string;
}

const Home: NextPage<Props> = ({ players }) => (
  <Container>
    <Head>
      <title>Zawodnicy</title>
      <meta name="description" content="Siatkówka - Zawodnicy" />
    </Head>
    <Players players={JSON.parse(players)} />
  </Container>
);

export default Home;

export const getStaticProps = async () => {
  const players = await getPlayers();

  return {
    props: {
      players: JSON.stringify(players),
    },
  };
};
