import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ReactClient, ReactRedux } from "@/components/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactClient>
      <ReactRedux>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </ReactRedux>
    </ReactClient>
  );
}
