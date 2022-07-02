import {
  Card,
  Center,
  Grid,
  Loader,
  Stack,
  Title,
  Text,
  useMantineTheme,
} from "@mantine/core";
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
  const { error: projectError, project } = useGetProject({
    id: query.id,
  });
  // const {
  //   isLoading: tasksIsLoading,
  //   isError: tasksIsError,
  //   data: taskData,
  // } = useGetAllTasksByProject({ projectId: query.id });

  // if (tasksIsLoading)
  //   return (
  //     <Center>
  //       <Loader />
  //     </Center>
  //   );

  if (projectError) {
    console.log(projectError);
    push("/");
  }
  return (
    <div style={styles.container}>
      <Stack>
        <ProjectTitleComponent projectName={project?.name as string} />
        <ProjectDescriptionComponent
          projectDescription={project?.description as string}
        />
        <Grid>
          {/* {taskData?.map((task) => (
            <Grid.Col key={task.ID} span={2}>
              <Card shadow="lg" p="lg" sx={{ height: 150 }}>
                <Stack>
                  <Title order={4}> {task.title}</Title>
                  <Text lineClamp={2}>{task.description}</Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))} */}
        </Grid>
      </Stack>
    </div>
  );
}
