import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

type ThemeProviderProps = {
  children: React.ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme: MantineThemeOverride = {
    colorScheme: "dark",
    headings: {
      fontFamily: "'League Spartan', sans-serif;",
    },
  };
  return (
    <>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </>
  );
};

export default ThemeProvider;
