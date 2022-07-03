import {
  ActionIcon,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Home, MoonStars, Sun } from "tabler-icons-react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
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

const HomeButton = () => {
  return (
    <Link href="/">
      <ActionIcon
        size={32}
        variant="light"
        color={"teal"}
        title="Navigate to home"
      >
        <Home size={24} />
      </ActionIcon>
    </Link>
  );
};

const HeaderOptions = () => {
  return (
    <Group>
      <ColorSchemeToggle />
      <HomeButton />
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
    <Header height={72} p="md">
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
        <Group style={styles.group} position="apart">
          <Group spacing="xs" align={"center"}>
            <Image src="/gopher.svg" alt="go logo" width="36" height="48" />
            <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
              <Title style={styles.title}>GO TASK MGR</Title>
            </MediaQuery>
          </Group>
          <HeaderOptions />
        </Group>
      </div>
    </Header>
  );
};

export default LayoutHeader;
