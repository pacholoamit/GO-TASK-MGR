import { Header, Text } from "@mantine/core";
import Image from "next/image";
const LayoutHeader: React.FC = () => {
  return (
    <Header height={60} p="xs">
      <Image src="/go.svg" alt="go logo" width="48" height="48" />
    </Header>
  );
};

export default LayoutHeader;
