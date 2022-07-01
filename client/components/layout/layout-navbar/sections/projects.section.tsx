import { Title, Loader, Navbar, ScrollArea } from "@mantine/core";
import { GetServerSideProps } from "next";
import NavbarButton from "../components/navbar.button";
import { useQuery } from "react-query";
import { getAllProjects } from "../../../../api";
import { Projects } from "../../../../api/dto";
import { Folder } from "tabler-icons-react";

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await getAllProjects();
  return { props: { projects } };
};

interface ProjectsSectionProps {
  projects: Projects;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { data: allProjects } = useQuery<Projects, Error>(
    "projects",
    getAllProjects,
    {
      initialData: projects,
    }
  );

  const projectsComponent = allProjects?.map((project) => (
    <NavbarButton
      key={project.ID}
      icon={<Folder size={16} />}
      onClick={() => {}}
      label={project.name}
      color={"blue"}
    />
  ));

  return (
    <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
      <Title order={3}>Projects</Title>
      {allProjects ? projectsComponent : <Loader />}
    </Navbar.Section>
  );
};

export default ProjectsSection;
