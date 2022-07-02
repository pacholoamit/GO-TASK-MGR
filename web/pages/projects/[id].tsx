import { Card, Center, Grid, Loader, Stack, Title, Text } from "@mantine/core";
import axios from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import { apiUrl } from "../../api/config";
import { Project, Tasks } from "../../api/dto";
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const project: Project = await axios
    .get(`${apiUrl}/project/${params?.id}`)
    .then((res) => res.data);

  const tasks: Tasks = await axios
    .get(`${apiUrl}/project/${params?.id}/tasks`)
    .then((res) => res.data);

  return { props: { key: params?.id, project, tasks } };
};

interface ProjectPageProps {
  project: Project;
  tasks: Tasks;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, tasks }) => {
  return (
    <div style={styles.container}>
      <Stack>
        <ProjectTitleComponent projectName={project?.name as string} />
        <ProjectDescriptionComponent
          projectDescription={project?.description as string}
        />
        <Grid>
          {tasks?.map((task) => (
            <Grid.Col key={task.ID} span={2}>
              <Card shadow="lg" p="lg" sx={{ height: 150 }}>
                <Stack>
                  <Title order={4}> {task.title}</Title>
                  <Text lineClamp={2}>{task.description}</Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </div>
  );
};

export default ProjectPage;
