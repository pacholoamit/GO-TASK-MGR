import useTaskContext from "@/features/tasks/hooks/useTaskContext";

import { Grid, Card, Text, Stack, Badge } from "@mantine/core";
import { Task } from "@/features/api/dto";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { proxyTask } = useTaskContext();
  const onClick = () => proxyTask(task);

  return (
    <Grid.Col sm={12} md={4} lg={2}>
      <Card
        shadow="lg"
        p="lg"
        sx={{ height: 150 }}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Stack align={"flex-start"}>
          <Text size={"sm"} lineClamp={3}>
            {task.title}
          </Text>
          {task.status && (
            <Badge variant="light" color={"red"}>
              {task.status}
            </Badge>
          )}
          {task.label && (
            <Badge variant="light" color={"blue"}>
              {task.label}
            </Badge>
          )}
        </Stack>
      </Card>
    </Grid.Col>
  );
};

interface TasksCardProps {
  tasks: Task[];
}

const TaskCards: React.FC<TasksCardProps> = ({ tasks }) => {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.ID} />
      ))}
    </Grid>
  );
};

export default TaskCards;
