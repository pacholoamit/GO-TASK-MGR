import { Navbar, Space } from "@mantine/core";
import ActionsSection from "./sections/actions.section";
import ProjectsSection from "./sections/projects.section";

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <ActionsSection />
      <Space h="lg" />
      <ProjectsSection />
    </Navbar>
  );
};

export default LayoutNavbar;
