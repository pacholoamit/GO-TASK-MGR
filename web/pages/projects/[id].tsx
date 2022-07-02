import { Card, Center, Loader, Stack } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import { Project, Tasks } from "../../api/dto";
import ProjectDescriptionComponent from "../../components/project/project-description";
import ProjectTitleComponent from "../../components/project/project-title";
import TaskCards from "../../components/tasks/task-cards";
import useGetAllTasksAndProject from "../../hooks/useGetAllTasksAndProject";

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { key: params?.id } };
};

const ProjectPage = () => {
  const { query, push } = useRouter();
  const { project, tasks, isLoading, isError } = useGetAllTasksAndProject({
    id: query.id,
  });

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (isError) {
    push("/");
  }

  return (
    <div style={styles.container}>
      <Stack>
        <ProjectTitleComponent projectName={project?.name || ""} />
        <ProjectDescriptionComponent
          projectDescription={project?.description || ""}
        />
        <TaskCards tasks={tasks ?? []} />
      </Stack>
    </div>
  );
};

export default ProjectPage;
