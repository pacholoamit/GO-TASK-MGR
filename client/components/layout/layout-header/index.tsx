import { Group, Header, Text, Title } from "@mantine/core";
import Image from "next/image";
import { CSSProperties } from "react";

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

const LayoutHeader: React.FC = () => {
  return (
    <Header height={72} p="xs">
      <Group style={styles.group} spacing="xs" align={"center"}>
        <Image src="/gopher.svg" alt="go logo" width="36" height="48" />
        <Title style={styles.title}>GO TASK MGR</Title>
      </Group>
    </Header>
  );
};

export default LayoutHeader;
