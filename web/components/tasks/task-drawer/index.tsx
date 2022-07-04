import React from "react";

import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  Button,
  Drawer,
  Stack,
  Text,
  MultiSelect,
  ScrollArea,
  Textarea,
  Group,
  ActionIcon,
} from "@mantine/core";
import { TaskRequest } from "../../../api/dto";
import RichTextEditor from "../../RichTextEditor";
import useTaskContext from "../../../hooks/useTaskContext";
import useCreateOrUpdateTask from "../../../hooks/useCreateOrUpdateTask";
import ErrorNotification from "../../notifications/error.notification";
import { Trash } from "tabler-icons-react";
import useDeleteTask from "../../../hooks/useDeleteTask";

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
  const mut = useCreateOrUpdateTask();
  const { opened, currentTask, clearTask } = useTaskContext();
  const { mutate: remove } = useDeleteTask();
  const isExistingTask = currentTask?.ID;
  const submitText = isExistingTask ? "Update task! " : "Create a new task!";

  const handleRemoveTask = () => {
    remove(currentTask?.ID?.toString() as string);
    clearTask();
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  React.useEffect(() => {
    form.setValues(currentTask ?? initialValues);
    if (mut.isError)
      ErrorNotification({
        title: "Oh no an error!",
        message: "Something bad happened because of my bad programming skills",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mut.isError, currentTask]);

  return (
    <ScrollArea style={{ height: "100vh" }}>
      <Drawer
        opened={opened}
        position="right"
        size="40%"
        onClose={() => clearTask()}
        padding="xl"
        overlayBlur={5}
      >
        <form
          onSubmit={form.onSubmit((v) => {
            mut.mutate(v);
            clearTask();
          })}
        >
          <Stack align={"flex-start"}>
            <Group position="apart" style={{ width: "100%" }}>
              <Textarea
                placeholder="Write a task name"
                variant="filled"
                disabled={mut.isLoading}
                size={"xl"}
                minRows={1}
                maxRows={3}
                autosize
                required
                style={{ width: "80%" }}
                {...form.getInputProps("title")}
              />
              {isExistingTask && (
                <ActionIcon
                  onClick={handleRemoveTask}
                  variant="filled"
                  color={"red"}
                >
                  <Trash size={16} />
                </ActionIcon>
              )}
            </Group>

            <MultiSelect
              label="Label"
              maxSelectedValues={1}
              variant={"unstyled"}
              disabled={mut.isLoading}
              defaultValue={[
                form.getInputProps("label").value || statusOpts[0].status,
              ]}
              onChange={(arr) => form.setFieldValue("label", arr[0])}
              data={statusOpts.map(({ status }) => status)}
            />
            <Text>Description</Text>
            <RichTextEditor {...form.getInputProps("description")} />
            <Button mt="md" type="submit" loading={mut.isLoading}>
              {submitText}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </ScrollArea>
  );
};

export default TaskDrawer;
