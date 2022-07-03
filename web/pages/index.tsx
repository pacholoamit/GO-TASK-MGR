import { Center, Loader, Stack, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { CSSProperties } from "react";
import TaskCards from "../components/tasks/task-cards";
import useGetAllTasks from "../hooks/useGetAllTasks";

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
  nter: {
    height: "100%",
  },
};
const Home: NextPage = () => {
  const { tasks, isLoading } = useGetAllTasks();

  if (isLoading)
    return (
      <Center style={styles.center}>
        <Loader />
      </Center>
    );

  return (
    <div style={styles.container}>
      <Head>
        <title>GO TASK MGR</title>
        <link rel="icon" href="/gopher.svg" />
      </Head>
      <Stack>
        <Title>Recently created tasks</Title>
        <TaskCards tasks={tasks ?? []} />
      </Stack>
    </div>
  );
};

export default Home;
