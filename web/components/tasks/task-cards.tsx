import { Grid, Card, Title, Text, Stack } from "@mantine/core";
import { Task, Tasks } from "../../api/dto";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Grid.Col span={2}>
      <Card shadow="lg" p="lg" sx={{ height: 150 }}>
        <Stack>
          <Title order={4}> {task.title}</Title>
          <Text lineClamp={2}>{task.description}</Text>
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
