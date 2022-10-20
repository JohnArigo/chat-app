import "../styles/globals.css";
import type { AppProps } from "next/app";
import Practice from "../components/NavBar";
import Footer from "../components/Footer";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Practice />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
