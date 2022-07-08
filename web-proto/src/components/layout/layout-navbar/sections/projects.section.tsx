import NavbarButton from "../navbar.button";
import useGetAllProjects from "@/features/projects/hooks/useGetAllProjects";
import { Link } from "react-router-dom";
import { Project } from "@/features/api/dto";
import { Folder } from "tabler-icons-react";
import {
  Title,
  Loader as MaintineLoader,
  Navbar,
  ScrollArea,
  Center,
} from "@mantine/core";

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const projectslist = projects.map((project) => (
    <Link to={`/projects/${encodeURIComponent(project.ID)}`} key={project.ID}>
      <NavbarButton
        icon={<Folder size={16} />}
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
