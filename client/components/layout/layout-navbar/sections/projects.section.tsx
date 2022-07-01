import { Title, Loader, Navbar, ScrollArea, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import NavbarButton from "../components/navbar.button";
import { useQuery } from "react-query";
import { getAllProjects } from "../../../../api";
import { Projects } from "../../../../api/dto";
import { Folder } from "tabler-icons-react";

interface ProjectsListProps {
  projects: Projects;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const projectslist = projects.map((project) => (
    <NavbarButton
      key={project.ID}
      icon={<Folder size={16} />}
      onClick={() => {}}
      label={project.name}
      color={"blue"}
    />
  ));

  return <>{projectslist}</>;
};

const ProjectsSection: React.FC = () => {
  const { data: allProjects, isLoading } = useQuery<Projects, Error>(
    "projects",
    getAllProjects
  );

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
