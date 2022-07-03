import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Providers from "../providers";
import TaskDrawer from "../components/tasks/task-drawer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
        <TaskDrawer />
      </Layout>
    </Providers>
  );
}

export default MyApp;
