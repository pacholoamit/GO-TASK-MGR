import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Projects, Project } from "../../api/dto";

interface ProjectProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>This is Project {id}</h1>
      <p>{JSON.stringify(project)}</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const req = await fetch(`http://localhost:8081/project/${query.id}`);
  const data = (await req.json()) as Projects;

  return {
    props: { project: data },
  };
};
