import useCreateTask from "../../hooks/useCreateTask";
import React from "react";

import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Button, Drawer, Stack, TextInput, Text } from "@mantine/core";
import { TaskRequest } from "../../api/dto";
import RichTextEditor from "../RichTextEditor";
import useTaskContext from "../../hooks/useTaskContext";

const initialValues: TaskRequest = {
  title: "",
  description: "",
  status: "",
  label: "",
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  status: z.string(),
  label: z.string(),
});

const TaskDrawer: React.FC = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateTask();
  const { opened, setOpened, currentTask } = useTaskContext();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  React.useEffect(() => {
    currentTask && form.setValues(currentTask);
    if (isSuccess) {
      setOpened(false);
    }
    if (isError) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, currentTask]);

  return (
    <Drawer
      opened={opened}
      position="right"
      size="40%"
      onClose={() => setOpened(false)}
      padding="xl"
    >
      <form onSubmit={form.onSubmit((v) => mutate(v))}>
        <Stack>
          <TextInput
            label="Task Name"
            placeholder="Rule the world!"
            disabled={isLoading}
            {...form.getInputProps("title")}
          />
          <Text>Description</Text>
          <RichTextEditor {...form.getInputProps("description")} />
          <Button mt="md" type="submit" loading={isLoading}>
            Create a new task!
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default TaskDrawer;
