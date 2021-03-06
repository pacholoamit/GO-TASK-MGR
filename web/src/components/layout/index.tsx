import React from "react";
import LayoutNavbar from "@/components/layout/layout-navbar";
import LayoutHeader from "@/components/layout/layout-header";
import TaskDrawer from "@/features/tasks/components/task-drawer";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const theme = useMantineTheme();

  const [opened, setOpened] = React.useState(false);
  const styles = {
    main: {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  };
  return (
    <AppShell
      padding={"md"}
      navbar={<LayoutNavbar opened={opened} />}
      header={<LayoutHeader opened={opened} setOpened={setOpened} />}
      navbarOffsetBreakpoint="sm"
      fixed
      styles={styles}
    >
      <Outlet />
      <TaskDrawer />
    </AppShell>
  );
};

export default Layout;
