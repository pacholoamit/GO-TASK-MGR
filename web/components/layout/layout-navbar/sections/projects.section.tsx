import NavbarButton from "../navbar.button";
import Link from "next/link";
import {
  Title,
  Loader as MaintineLoader,
  Navbar,
  ScrollArea,
  Center,
  Menu,
} from "@mantine/core";
import { Projects } from "../../../../api/dto";
import { Eraser, Folder, Trash } from "tabler-icons-react";
import useGetAllProjects from "../../../../hooks/useGetAllProjects";
import useDeleteProject from "../../../../hooks/useDeleteProject";

interface ProjectMenuProps {
  id: string;
}
const ProjectMenu: React.FC<ProjectMenuProps> = ({ id }) => {
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = () => deleteProject(id);
  return (
    <Menu>
      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Eraser size={14} />} color="green">
        Rename
      </Menu.Item>
      <Menu.Item icon={<Trash size={14} />} color="red" onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );
};
interface ProjectsListProps {
  projects: Projects;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const projectslist = projects.map((project) => (
    <Link href={`/projects/${encodeURIComponent(project.ID)}`} key={project.ID}>
      <NavbarButton
        icon={<Folder size={16} />}
        label={project.name}
        color={"blue"}
        menu={<ProjectMenu id={project.ID} />}
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
