import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default QueryProvider;
