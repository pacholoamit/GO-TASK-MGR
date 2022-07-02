import { Card, Center, Grid, Loader, Stack, Title, Text } from "@mantine/core";
import axios from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import { apiUrl } from "../../api/config";
import { Project, Tasks } from "../../api/dto";
import ProjectDescriptionComponent from "../../components/project/project-description";
import ProjectTitleComponent from "../../components/project/project-title";
import TaskCards from "../../components/tasks/task-cards";
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
        <ProjectTitleComponent projectName={project.name} />
        <ProjectDescriptionComponent projectDescription={project.description} />
        <TaskCards tasks={tasks} />
      </Stack>
    </div>
  );
};

export default ProjectPage;
