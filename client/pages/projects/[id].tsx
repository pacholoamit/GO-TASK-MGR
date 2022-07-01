import { Center, Loader, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import ProjectDescriptionComponent from "../../components/project/project-description";
import ProjectTitleComponent from "../../components/project/project-title";
import useGetAllTasksByProject from "../../hooks/useGetAllTasksByProject";
import useGetProject from "../../hooks/useGetProject";

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

export default function ProjectPage() {
  const { query, push } = useRouter();
  const {
    isLoading: projectIsLoading,
    isError: projectIsError,
    data: projectData,
  } = useGetProject({ id: query.id });
  const {
    isLoading: tasksIsLoading,
    isError: tasksIsError,
    data: taskData,
  } = useGetAllTasksByProject({ projectId: query.id });

  if (projectIsLoading || tasksIsLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (projectIsError || tasksIsError) push("/");

  return (
    <div style={styles.container}>
      <Stack>
        <ProjectTitleComponent projectName={projectData?.name as string} />
        <ProjectDescriptionComponent
          projectDescription={projectData?.description as string}
        />
      </Stack>
    </div>
  );
}
