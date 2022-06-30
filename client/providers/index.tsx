import React from "react";
import QueryProvider from "./query.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
