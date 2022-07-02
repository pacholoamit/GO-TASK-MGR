import NavbarButton from "../components/navbar.button";
import Link from "next/link";
import { Title, Loader, Navbar, ScrollArea, Center } from "@mantine/core";
import { Projects } from "../../../../api/dto";
import { Folder } from "tabler-icons-react";
import useGetAllProjects from "../../../../hooks/useGetAllProjects";
import { NextRouter, useRouter } from "next/router";

interface ProjectsListProps {
  projects: Projects;
  router: NextRouter;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, router }) => {
  const projectslist = projects.map((project) => (
    <NavbarButton
      key={project.ID}
      icon={<Folder size={16} />}
      onClick={() => router.push(`/projects/${encodeURIComponent(project.ID)}`)}
      label={project.name}
      color={"blue"}
    />
  ));

  return <>{projectslist}</>;
};

const ProjectsSection: React.FC = () => {
  const router = useRouter();
  const { data: allProjects, isLoading } = useGetAllProjects();

  return (
    <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
      <Title order={3}>Projects</Title>

      {isLoading ? (
        <Loader />
      ) : (
        <ProjectsList projects={allProjects || []} router={router} />
      )}
    </Navbar.Section>
  );
};

export default ProjectsSection;
