import ErrorNotification from "@/components/notifications/error.notification";
import SuccessNotification from "@/components/notifications/success.notification";
import ProjectDescriptionComponent from "@/features/projects/components/project-description";
import ProjectTitleComponent from "@/features/projects/components/project-title";
import TaskCards from "@/features/tasks/components/task-cards";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";
import useGetAllTasksByProject from "@/features/projects/hooks/useGetAllTasksByProject";

import { Center, Group, Loader, Menu, Stack } from "@mantine/core";
import React, { CSSProperties } from "react";
import { Trash } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "@/features/api/dto";

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

interface ProjectMenuProps {
  id: string;
  name: string;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({ id, name }) => {
  const { mutate: deleteProject, isSuccess, isError } = useDeleteProject();
  const navigate = useNavigate();
  const handleDelete = () => deleteProject(id);

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/");
      SuccessNotification({
        title: "Successfully deleted project",
        message: `Project ${name} deleted`,
      });
    }
    if (isError) ErrorNotification({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
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
  const navigate = useNavigate();
  const { id } = useParams();
  const { project, isLoading, isError } = useGetAllTasksByProject({ id });

  if (isLoading)
    return (
      <Center style={styles.center}>
        <Loader />
      </Center>
    );

  if (isError) {
    ErrorNotification({});
    navigate("/");
  }

  return (
    <div style={styles.container}>
      <Stack>
        <Group>
          <ProjectMenu
            id={project?.ID?.toString() as string}
            name={project?.name as string}
          />
          <ProjectTitleComponent project={project as Project} />
        </Group>
        <ProjectDescriptionComponent project={project as Project} />
        <TaskCards tasks={project?.tasks ?? []} />
      </Stack>
    </div>
  );
};

export default ProjectPage;
