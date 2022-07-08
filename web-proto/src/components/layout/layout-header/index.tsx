import gopherSvg from "@/assets/gopher.svg";
import { CSSProperties } from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import {
  ActionIcon,
  Burger,
  Group,
  Header,
  MediaQuery,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },
};

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      size={32}
      variant="light"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Switch to light/dark mode"
    >
      {dark ? <Sun size={24} /> : <MoonStars size={24} />}
    </ActionIcon>
  );
};

const HeaderOptions = () => {
  return (
    <Group>
      <ColorSchemeToggle />
    </Group>
  );
};

interface LayoutHeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
const LayoutHeader: React.FC<LayoutHeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  return (
    <Header height={72} p="xl">
      <div style={styles.container}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group spacing="xs" align={"center"}>
          <img src={gopherSvg} alt="go logo" width="36" height="48" />
          <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
            <Title style={styles.title}>GO TASK MGR</Title>
          </MediaQuery>
        </Group>
        <HeaderOptions />
      </div>
    </Header>
  );
};

export default LayoutHeader;
