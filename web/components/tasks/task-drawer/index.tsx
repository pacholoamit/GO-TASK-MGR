import React from "react";
import RichTextEditor from "../../RichTextEditor";
import useTaskContext from "../../../hooks/useTaskContext";
import useCreateOrUpdateTask from "../../../hooks/useCreateOrUpdateTask";
import ErrorNotification from "../../notifications/error.notification";
import useDeleteTask from "../../../hooks/useDeleteTask";

import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Trash } from "tabler-icons-react";
import { TaskRequest } from "../../../api/dto";
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
  Chips,
  Chip,
  Select,
} from "@mantine/core";
import useGetAllProjects from "../../../hooks/useGetAllProjects";

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
  projectId: "",
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  status: z.string(),
  label: z.string(),
  projectId: z.string(),
});

const TaskDrawer: React.FC = () => {
  const mut = useCreateOrUpdateTask();
  const { opened, currentTask, clearTask } = useTaskContext();
  const { allProjects } = useGetAllProjects();
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

  const chipStatusOptions = statusOpts.map(({ status }) => (
    <Chip key={status} value={status}>
      {status}
    </Chip>
  ));

  const projectSelectOptions = allProjects?.map((project) => ({
    value: project.ID.toString(),
    label: project.name,
  }));

  const projectLabel = `Project ${
    !projectSelectOptions?.length
      ? "(Create a project to assign this task)"
      : ""
  }`;

  React.useEffect(() => {
    form.setValues(currentTask ?? initialValues);
    if (mut.isError) ErrorNotification({});
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
            <Select
              label={projectLabel}
              data={projectSelectOptions || [""]}
              size="md"
              variant="unstyled"
              {...form.getInputProps("projectId")}
            />

            <Text>Status</Text>
            <Chips
              variant="filled"
              color={"red"}
              size="sm"
              defaultValue={form.getInputProps("status").value}
              onChange={(v) => form.setFieldValue("status", v as string)}
            >
              {chipStatusOptions}
            </Chips>
            <MultiSelect
              label="Label"
              size="md"
              maxSelectedValues={1}
              variant={"unstyled"}
              disabled={mut.isLoading}
              defaultValue={[form.getInputProps("label").value || "none"]}
              onChange={(arr) => form.setFieldValue("label", arr[0] || "")}
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              data={[]}
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
