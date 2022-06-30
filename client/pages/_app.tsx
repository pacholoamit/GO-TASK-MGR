import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Providers from "../providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default MyApp;
