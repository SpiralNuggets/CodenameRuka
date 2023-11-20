import React from "react";
import { CookiesProvider } from "react-cookie";
import { AppProps } from "next/app";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <CookiesProvider>
        <Component {...pageProps} />
        </CookiesProvider>
      </div>
    </>
  );
}

export default MyApp;
