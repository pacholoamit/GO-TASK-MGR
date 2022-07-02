import { Grid, Card, Title, Text } from "@mantine/core";
import { Stack } from "tabler-icons-react";
import { Task, Tasks } from "../../api/dto";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Grid.Col key={task.ID} span={2}>
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
        <TaskCard task={task} key={task.ID} />
      ))}
    </Grid>
  );
};

export default TaskCards;
