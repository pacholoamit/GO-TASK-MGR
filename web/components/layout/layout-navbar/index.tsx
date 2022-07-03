import { Navbar, Space } from "@mantine/core";
import ActionsSection from "./sections/actions.section";
import ProjectsSection from "./sections/projects.section";

interface LayoutNavbarProps {
  opened: boolean;
}

const LayoutNavbar: React.FC<LayoutNavbarProps> = ({ opened }) => {
  return (
    <Navbar
      p="xs"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <ActionsSection />
      <Space h="lg" />
      <ProjectsSection />
    </Navbar>
  );
};

export default LayoutNavbar;
