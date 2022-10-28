import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider, useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
import Header from "../components/NavBar";
export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
