import {
  ActionIcon,
  Group,
  Header,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Home, MoonStars, Sun } from "tabler-icons-react";

const styles: { [key: string]: CSSProperties } = {
  group: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  title: {
    paddingTop: 8,
  },
};

const HeaderTitle = () => {
  return (
    <Group spacing="xs" align={"center"}>
      <Image src="/gopher.svg" alt="go logo" width="36" height="48" />
      <Title style={styles.title}>GO TASK MGR</Title>
    </Group>
  );
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
const LayoutHeader: React.FC = () => {
  return (
    <Header height={72} p="xs">
      <Group style={styles.group} position="apart">
        <HeaderTitle />
        <HeaderOptions />
      </Group>
    </Header>
  );
};

export default LayoutHeader;
