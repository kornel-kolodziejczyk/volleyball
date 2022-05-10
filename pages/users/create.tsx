import Container from "../../components/UI/Container/Container";
import CreateUser from "../../components/CreateUser/CreateUser";
import Head from "next/head";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session || !session.user.admin) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <Container>
      <Head>
        <title>Siatkówka - Dodawanie zawodnika</title>
        <meta name="description" content="Siatkówka - Dodawanie zawodnika" />
      </Head>
      <CreateUser />
    </Container>
  );
};

export default Page;
