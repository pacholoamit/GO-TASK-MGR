import useCreateTask from "../../hooks/useCreateTask";
import React from "react";

import { ContextModalProps } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  Button,
  Dialog,
  Drawer,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { CreateTaskRequest } from "../../api/dto";
import { showNotification, NotificationProps } from "@mantine/notifications";

const initialValues: CreateTaskRequest = {
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

interface CreateTaskDrawerProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTaskDrawer: React.FC<CreateTaskDrawerProps> = ({
  opened,
  setOpened,
}) => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateTask();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  React.useEffect(() => {
    if (isSuccess) {
      setOpened(false);
    }
    if (isError) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <Drawer
      opened={opened}
      position="right"
      size="30%"
      onClose={() => setOpened(false)}
      padding="xl"
    >
      <form onSubmit={form.onSubmit((v) => mutate(v))}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Whatchu gonna do?"
            disabled={isLoading}
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Description"
            placeholder="Whatchu gonna do?"
            minRows={8}
            disabled={isLoading}
            {...form.getInputProps("description")}
          />
          <Button mt="md" type="submit" loading={isLoading}>
            Create a new task!
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default CreateTaskDrawer;
