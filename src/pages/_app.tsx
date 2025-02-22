import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { reduxWrapper } from "../store/store";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default reduxWrapper.withRedux(App);
