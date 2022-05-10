import { GetStaticProps, NextPage } from "next";
import { getGame, getGames } from "../../../lib/game-utils";

import Container from "../../../components/UI/Container/Container";
import Game from "../../../components/Game/Game";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface Props {
  game: string;
}

const Page: NextPage<Props> = ({ game }) => (
  <Container>
    <Head>
      <title>Siatkówka - Mecz</title>
      <meta name="description" content="Siatkówka - Mecz" />
    </Head>
    <Game game={JSON.parse(game)} />
  </Container>
);

export default Page;

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;

  const game = await getGame(id);

  return {
    props: { game: JSON.stringify(game) },
  };
};

export const getStaticPaths = async () => {
  const games = await getGames();

  return {
    paths: games.map((game) => ({ params: { id: game._id.toString() } })),
    fallback: "blocking",
  };
};
