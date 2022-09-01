import TaskCards from "@/features/tasks/components/task-cards";
import useGetAllTasks from "@/features/tasks/hooks/useGetAllTasks";

import { Center, Loader, Stack, Title } from "@mantine/core";
import { CSSProperties } from "react";

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
const Home: React.FC = () => {
  const { tasks, isLoading } = useGetAllTasks();

  if (isLoading || !tasks) {
    return (
      <Center style={styles.center}>
        <Loader />
      </Center>
    );
  }

  return (
    <div style={styles.container}>
      <Stack>
        <Title>Recently created tasks</Title>
        <TaskCards tasks={tasks} />
      </Stack>
    </div>
  );
};

export default Home;
