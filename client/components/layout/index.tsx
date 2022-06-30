import React from "react";
import { AppShell } from "@mantine/core";
import LayoutNavbar from "./layout-navbar";
import LayoutHeader from "./layout-header";

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
