import axios, { AxiosRequestConfig } from "axios";
import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (...args: [string, AxiosRequestConfig]) =>
          axios(...args)
            .then((res) => res.data)
            .catch((err) => {
              throw err;
            }),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
