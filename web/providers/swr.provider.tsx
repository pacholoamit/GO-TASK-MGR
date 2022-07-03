import useSWR, { SWRConfig } from "swr";

interface SWRProviderProps {
  children: React.ReactNode;
}
const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
