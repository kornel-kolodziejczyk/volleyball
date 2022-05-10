import { GetServerSideProps, NextPage } from "next";

import Container from "../../components/UI/Container/Container";
import CreateGame from "../../components/CreateGame/CreateGame";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { getUsers } from "../../lib/game-utils";

interface Props {
  users: string;
}

const Page: NextPage<Props> = ({ users }) => (
  <Container>
    <Head>
      <title>Siatkówka - Dodawanie meczu</title>
      <meta name="description" content="Siatkówka - Dodawanie meczu" />
    </Head>
    <CreateGame users={JSON.parse(users)} />
  </Container>
);

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || !session.user.admin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }

  const users = await getUsers();

  return {
    props: { users: JSON.stringify(users) },
  };
};
