import { GetServerSideProps, NextPage } from "next";

import Container from "../../components/UI/Container/Container";
import Head from "next/head";
import { IUser } from "../../models/User";
import Profile from "../../components/Profile/Profile";
import { getSession } from "next-auth/react";
import { getUser } from "../../lib/game-utils";

interface Props {
  user: Pick<IUser, "image" | "sex">;
}

const Page: NextPage<Props> = ({ user }) => (
  <Container>
    <Head>
      <title>Siatkówka - Profil zawodnika</title>
      <meta name="description" content="Siatkówka - Profil zawodnika" />
    </Head>
    <Profile user={user} />;
  </Container>
);

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await getUser(session.user._id);

  return {
    props: { user },
  };
};
