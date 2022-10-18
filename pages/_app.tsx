import "../styles/globals.css";
import type { AppProps } from "next/app";
import Practice from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Practice />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
