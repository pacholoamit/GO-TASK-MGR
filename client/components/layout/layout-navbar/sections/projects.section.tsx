import NavbarButton from "../components/navbar.button";
import Link from "next/link";
import { Title, Loader, Navbar, ScrollArea, Center } from "@mantine/core";
import { Projects } from "../../../../api/dto";
import { Folder } from "tabler-icons-react";
import useGetAllProjects from "../../../../hooks/useGetAllProjects";

interface ProjectsListProps {
  projects: Projects;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const projectslist = projects.map((project) => (
    <Link
      key={project.name}
      href={`/projects/${encodeURIComponent(project.ID)}`}
    >
      <NavbarButton
        icon={<Folder size={16} />}
        onClick={() => {}}
        label={project.name}
        color={"blue"}
      />
    </Link>
  ));

  return <>{projectslist}</>;
};

const ProjectsSection: React.FC = () => {
  const { data: allProjects, isLoading } = useGetAllProjects();

  return (
    <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
      <Title order={3}>Projects</Title>
      <Center>
        {isLoading ? <Loader /> : <ProjectsList projects={allProjects || []} />}
      </Center>
    </Navbar.Section>
  );
};

export default ProjectsSection;
