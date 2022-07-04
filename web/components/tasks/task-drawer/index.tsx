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
  ScrollArea,
} from "@mantine/core";
import { TaskRequest } from "../../../api/dto";
import RichTextEditor from "../../RichTextEditor";
import useTaskContext from "../../../hooks/useTaskContext";
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
  status: statusOpts[0].status,
  label: "",
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  status: z.string(),
  label: z.string(),
});

const TaskDrawer: React.FC = () => {
  const { opened, currentTask, clearTask } = useTaskContext();
  const opts = useCreateOrUpdateTask();

  const buttonText = currentTask?.ID ? "Update task! " : "Create a new task!";

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  React.useEffect(() => {
    form.setValues(currentTask ?? initialValues);
    if (opts.isSuccess) clearTask();
    if (opts.isError) console.log(opts.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.isSuccess, opts.isError, currentTask]);

  console.log(form.getInputProps("label").value);

  return (
    <ScrollArea style={{ height: "100vh" }}>
      <Drawer
        opened={opened}
        position="right"
        size="40%"
        onClose={() => clearTask()}
        padding="xl"
      >
        <form onSubmit={form.onSubmit((v) => opts.mutate(v))}>
          <Stack align={"flex-start"}>
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
              defaultValue={[
                form.getInputProps("label").value || statusOpts[0].status,
              ]}
              onChange={(arr) => form.setFieldValue("label", arr[0])}
              data={statusOpts.map(({ status }) => status)}
            />
            <Text>Description</Text>
            <RichTextEditor {...form.getInputProps("description")} />
            <Button mt="md" type="submit" loading={opts.isLoading}>
              {buttonText}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </ScrollArea>
  );
};

export default TaskDrawer;
