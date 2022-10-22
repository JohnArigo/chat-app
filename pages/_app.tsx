import "../styles/globals.css";
import type { AppProps } from "next/app";
import Practice from "../components/NavBar";
import Footer from "../components/Footer";
import { SessionProvider, useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  console.log(pageProps.session);
  return (
    <SessionProvider session={pageProps.session}>
      <Practice />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
