import Container from "../../components/UI/Container/Container";
import Head from "next/head";
import type { NextPage } from "next";
import Statistics from "../../components/Statistics/Statistics";
import { getStats } from "../../lib/game-utils";

interface Props {
  statistics: string;
}

const Home: NextPage<Props> = ({ statistics }) => (
  <Container>
    <Head>
      <title>Siatkówka - Statystyki</title>
      <meta name="description" content="Siatkówka - Statystyki" />
    </Head>
    <Statistics statistics={JSON.parse(statistics)} />
  </Container>
);

export default Home;

export const getStaticProps = async () => {
  const statistics = await getStats();

  return {
    props: {
      statistics: JSON.stringify(statistics),
    },
  };
};
