import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

type ThemeProviderProps = {
  children: React.ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme: MantineThemeOverride = {
    colorScheme: "dark",
  };
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
