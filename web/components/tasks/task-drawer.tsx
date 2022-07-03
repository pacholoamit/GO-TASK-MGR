import useCreateTask from "../../hooks/useCreateTask";
import React from "react";

import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  Button,
  Drawer,
  Stack,
  TextInput,
  Text,
  MultiSelect,
} from "@mantine/core";
import { TaskRequest } from "../../api/dto";
import RichTextEditor from "../RichTextEditor";
import useTaskContext from "../../hooks/useTaskContext";

interface StatusEnum {
  status: "Not Started" | "In Progress" | "Waiting" | "Deferred" | "Done";
}

const statusOpts: StatusEnum[] = [
  { status: "Not Started" },
  { status: "In Progress" },
  { status: "Waiting" },
  { status: "Deferred" },
  { status: "Done" },
];

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
    form.setValues(currentTask ?? initialValues);
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
            placeholder="Write a task name"
            disabled={isLoading}
            size={"xl"}
            {...form.getInputProps("title")}
          />

          <MultiSelect
            label="Label"
            searchable
            maxSelectedValues={1}
            disabled={isLoading}
            defaultValue={[statusOpts[0].status]}
            data={statusOpts.map(({ status }) => status)}
            {...form.getInputProps("label")}
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
