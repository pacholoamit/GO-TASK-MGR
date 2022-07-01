import { Title, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { getAllProjects } from "../../../../api";
import { Projects } from "../../../../api/dto";

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await getAllProjects();
  console.log(projects);
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
  console.log(allProjects);
  return (
    <>
      <Title order={3}>Projects</Title>
      {allProjects?.map((project) => (
        <div key={project.ID}>
          <Text>{project.name}</Text>
        </div>
      ))}
    </>
  );
};

export default ProjectsSection;
