import { Center, Container, Group, Loader, Menu, Stack } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import { Trash } from "tabler-icons-react";
import ProjectDescriptionComponent from "../../components/project/project-description";
import ProjectTitleComponent from "../../components/project/project-title";
import TaskCards from "../../components/tasks/task-cards";
import useDeleteProject from "../../hooks/useDeleteProject";
import useGetAllTasksAndProject from "../../hooks/useGetAllTasksAndProject";

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
  center: {
    height: "100%",
  },
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { key: params?.id } };
};

interface ProjectMenuProps {
  id: string;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({ id }) => {
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = () => deleteProject(id);

  return (
    <Menu>
      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Trash size={14} />} color="red" onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );
};

const ProjectPage = () => {
  const { query, push } = useRouter();
  const { project, tasks, isLoading, isError } = useGetAllTasksAndProject({
    id: query.id,
  });

  if (isLoading)
    return (
      <Center style={styles.center}>
        <Loader />
      </Center>
    );

  if (isError) push("/");

  return (
    <div style={styles.container}>
      <Stack>
        <Group>
          <ProjectMenu id={project?.ID?.toString() ?? ""} />
          <ProjectTitleComponent name={project?.name ?? ""} />
        </Group>
        <ProjectDescriptionComponent description={project?.description ?? ""} />
        <TaskCards tasks={tasks ?? []} />
      </Stack>
    </div>
  );
};

export default ProjectPage;
