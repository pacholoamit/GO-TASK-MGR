import useCreateTask from "../../hooks/useCreateTask";
import React from "react";

import { ContextModalProps } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Button, Stack, TextInput } from "@mantine/core";
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

const CreateTaskModal = ({ context, id }: ContextModalProps) => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateTask();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  const notificationProps: NotificationProps = {
    message: `Task successfully created! 🎉`,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.green[6],
        borderColor: theme.colors.green[6],
        "&::before": { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.green[7] },
      },
    }),
  };

  React.useEffect(() => {
    if (isSuccess) {
      context.closeModal(id);
      showNotification(notificationProps);
    }
    if (isError) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <form onSubmit={form.onSubmit((v) => mutate(v))}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Whatchu gonna do?"
          disabled={isLoading}
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          placeholder="Whatchu gonna do?"
          disabled={isLoading}
          {...form.getInputProps("description")}
        />
        <Button fullWidth mt="md" type="submit" loading={isLoading}>
          Create a new task!
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTaskModal;
