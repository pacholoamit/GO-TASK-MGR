import React from "react";
import useCreateProject from "../../hooks/useCreateProject";

import { Button, Textarea, TextInput, Stack, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { NotificationProps, showNotification } from "@mantine/notifications";
import { z } from "zod";
import { CreateProjectRequest } from "../../api/dto";
import { useSWRConfig } from "swr";
import { apiUrl } from "../../api/config";

const initialValues: CreateProjectRequest = {
  name: "",
  description: "",
};

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "You can't have a project without a name 🤔" }),
  description: z.string(),
});

const CreateProjectModal = ({ context, id }: ContextModalProps) => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateProject();
  const { mutate: revalidate } = useSWRConfig();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  const { value } = form.getInputProps("name");

  const notificationProps: NotificationProps = {
    title: `WOOO! New project created 🎉`,
    message: `Project ${value} successfully created!`,
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
      revalidate(`${apiUrl}/projects`);
    }
    if (isError) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <form onSubmit={form.onSubmit((v) => mutate(v))}>
      <Stack>
        <TextInput
          label="Project Name"
          placeholder="My super awesome project!"
          disabled={isLoading}
          {...form.getInputProps("name")}
          data-autoFocus
        />
        <Textarea
          label="Project Description"
          placeholder="Something about my awesome project!"
          disabled={isLoading}
          {...form.getInputProps("description")}
        />
        {isError && (
          <Text color={"red"}>
            An Error has occured, please try again later
          </Text>
        )}
        <Button fullWidth mt="md" type="submit" loading={isLoading}>
          Create a new awesome project!
        </Button>
      </Stack>
    </form>
  );
};

export default CreateProjectModal;
