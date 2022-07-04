import { Grid, Card, Title, Text, Stack, Button } from "@mantine/core";
import { Task, Tasks } from "../../api/dto";
import useTaskContext from "../../hooks/useTaskContext";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { proxyTask } = useTaskContext();
  const onClick = () => proxyTask(task);
  return (
    <Grid.Col sm={12} md={4} lg={2}>
      <Card shadow="lg" p="lg" sx={{ height: 150 }}>
        <Stack>
          <Text size={"sm"} lineClamp={1}>
            {task.title}
          </Text>
          <Button onClick={onClick}>Open</Button>
        </Stack>
      </Card>
    </Grid.Col>
  );
};

interface TasksCardProps {
  tasks: Tasks;
}

const TaskCards: React.FC<TasksCardProps> = ({ tasks }) => {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.title} />
      ))}
    </Grid>
  );
};

export default TaskCards;
