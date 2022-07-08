import React from "react";
import ModalsProvider from "./modal.provider";
import QueryProvider from "./query.provider";
import ThemeProvider from "./theme.provider";
import { TaskProvider } from "./task.context.provider";
import SWRProvider from "./swr.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SWRProvider>
      <QueryProvider>
        <ThemeProvider>
          <ModalsProvider>
            <TaskProvider>{children}</TaskProvider>
          </ModalsProvider>
        </ThemeProvider>
      </QueryProvider>
    </SWRProvider>
  );
};

export default Providers;
