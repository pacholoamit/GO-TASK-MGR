import useSWR, { SWRConfig } from "swr";

interface SWRProviderProps {
  children: React.ReactNode;
}
const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
