import { Navbar, ScrollArea } from "@mantine/core";
import ProjectsSection from "./sections/projects.section";

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <ProjectsSection projects={[]} />
    </Navbar>
  );
};

export default LayoutNavbar;
