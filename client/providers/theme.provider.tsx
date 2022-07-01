import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";

type ThemeProviderProps = {
  children: React.ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");

  const theme: MantineThemeOverride = {
    headings: {
      fontFamily: "'League Spartan', sans-serif;",
    },
    colorScheme,
  };

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default ThemeProvider;
