import React from "react";
import { AppShell, Header, Navbar, Text } from "@mantine/core";

const LayoutHeader: React.FunctionComponent = () => {
  return (
    <Header height={60} p="xs">
      <Text>Header</Text>
    </Header>
  );
};

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      <Text>Layout</Text>
    </Navbar>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding={"md"}
      navbar={<LayoutNavbar />}
      header={<LayoutHeader />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
