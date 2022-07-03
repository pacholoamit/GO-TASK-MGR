import { Grid, Card, Title, Text, Stack } from "@mantine/core";
import { Task, Tasks } from "../../api/dto";
import RichTextEditor from "../RichTextEditor";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Grid.Col sm={12} md={4} lg={2}>
      <Card shadow="lg" p="lg" sx={{ height: 150 }}>
        <Stack>
          <Title order={4}> {task.title}</Title>
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
