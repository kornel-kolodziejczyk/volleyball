import Container from "../../components/UI/Container/Container";
import Games from "../../components/Games/Games";
import Head from "next/head";
import { NextPage } from "next";
import { getGames } from "../../lib/game-utils";

interface Props {
  games: string;
}

const Page: NextPage<Props> = ({ games }) => (
  <Container>
    <Head>
      <title>Siatkówka - Mecze</title>
      <meta name="description" content="Siatkówka - Mecze" />
    </Head>
    <Games games={JSON.parse(games)} />
  </Container>
);

export default Page;

export const getStaticProps = async () => {
  const games = await getGames();

  return {
    props: { games: JSON.stringify(games) },
  };
};
