import React from "react";
import LayoutNavbar from "./layout-navbar";
import LayoutHeader from "./layout-header";
import { AppShell } from "@mantine/core";

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
