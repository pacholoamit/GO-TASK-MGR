import { Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getAllProjects, getProject } from "../../api";
import { Projects, Project } from "../../api/dto";

interface ProjectProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Title order={2}>{project.name}</Title>
      <p>{JSON.stringify(project)}</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const project = await getProject({ id: query.id });
  return { props: { project } };
};
