import {
  ActionIcon,
  Group,
  Header,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import { CSSProperties } from "react";
import { MoonStars, Sun } from "tabler-icons-react";

type styles = {
  [key: string]: CSSProperties;
};

const styles: styles = {
  group: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  title: {
    paddingTop: 8,
  },
};

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};

const LayoutHeader: React.FC = () => {
  return (
    <Header height={72} p="xs">
      <Group position="apart">
        <Group style={styles.group} spacing="xs" align={"center"}>
          <Image src="/gopher.svg" alt="go logo" width="36" height="48" />
          <Title style={styles.title}>GO TASK MGR</Title>
        </Group>
        <ColorSchemeToggle />
      </Group>
    </Header>
  );
};

export default LayoutHeader;
