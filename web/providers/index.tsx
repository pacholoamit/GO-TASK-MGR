import React from "react";
import ModalsProvider from "./modal.provider";
import QueryProvider from "./query.provider";
import ThemeProvider from "./theme.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
