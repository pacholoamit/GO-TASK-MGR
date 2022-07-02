import NavbarButton from "../navbar.button";
import Link from "next/link";
import {
  Title,
  Loader as MaintineLoader,
  Navbar,
  ScrollArea,
  Center,
} from "@mantine/core";
import { Projects } from "../../../../api/dto";
import { Folder } from "tabler-icons-react";
import useGetAllProjects from "../../../../hooks/useGetAllProjects";

interface ProjectsListProps {
  projects: Projects;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const projectslist = projects.map((project) => (
    <Link href={`/projects/${encodeURIComponent(project.ID)}`} key={project.ID}>
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

const Loader = () => {
  return (
    <Center style={{ height: "100%" }}>
      <MaintineLoader />
    </Center>
  );
};

const ProjectsSection: React.FC = () => {
  const { allProjects, isLoading } = useGetAllProjects();

  return (
    <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
      <Title order={3}>Projects</Title>
      {isLoading ? <Loader /> : <ProjectsList projects={allProjects || []} />}
    </Navbar.Section>
  );
};

export default ProjectsSection;
