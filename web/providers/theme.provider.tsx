import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";


type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");

  const theme: MantineThemeOverride = {
    fontFamily: "'Inter', sans-serif;",
    headings: {
      fontFamily: "'Inter', sans-serif;",
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
          <NotificationsProvider>{children}</NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default ThemeProvider;
