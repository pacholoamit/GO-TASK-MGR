import { Navbar, ScrollArea } from "@mantine/core";
import ProjectsSection from "./sections/projects.section";

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
        <ProjectsSection projects={[]} />
      </Navbar.Section>
    </Navbar>
  );
};

export default LayoutNavbar;
