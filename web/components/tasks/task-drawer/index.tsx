import useCreateTask from "../../../hooks/useCreateTask";
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
import { TaskRequest } from "../../../api/dto";
import RichTextEditor from "../../RichTextEditor";
import useTaskContext from "../../../hooks/useTaskContext";
import useUpdateTask from "../../../hooks/useUpdateTask";
import useCreateOrUpdateTask from "../../../hooks/useCreateOrUpdateTask";

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
  const { opened, setOpened, currentTask } = useTaskContext();
  const opts = useCreateOrUpdateTask();

  const buttonText = currentTask?.ID ? "Update task! " : "Create a new task!";

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  React.useEffect(() => {
    form.setValues(currentTask ?? initialValues);
    if (opts.isSuccess) {
      setOpened(false);
    }
    if (opts.isError) console.log(opts.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.isSuccess, opts.isError, currentTask]);

  return (
    <Drawer
      opened={opened}
      position="right"
      size="40%"
      onClose={() => setOpened(false)}
      padding="xl"
    >
      <form onSubmit={form.onSubmit((v) => opts.mutate(v))}>
        <Stack>
          <TextInput
            placeholder="Write a task name"
            disabled={opts.isLoading}
            size={"xl"}
            {...form.getInputProps("title")}
          />

          <MultiSelect
            label="Label"
            maxSelectedValues={1}
            variant={"unstyled"}
            disabled={opts.isLoading}
            defaultValue={[statusOpts[0].status]}
            data={statusOpts.map(({ status }) => status)}
            {...form.getInputProps("label")}
          />
          <Text>Description</Text>
          <RichTextEditor {...form.getInputProps("description")} />
          <Button mt="md" type="submit" loading={opts.isLoading}>
            {buttonText}
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default TaskDrawer;
