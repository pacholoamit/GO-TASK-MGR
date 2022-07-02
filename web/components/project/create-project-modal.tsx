import { Button, Textarea, TextInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import React from "react";
import useCreateProject from "../../hooks/useCreateProject";

const CreateProjectModal = ({ context, id }: ContextModalProps) => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateProject();

  const form = useForm({
    initialValues: {
      projectName: "",
      projectDescription: "",
    },
    validate: {
      projectName: (value) =>
        value.length > 0 ? null : "Can't have a project without a name 🤔",
    },
  });
  const projectNameProp = form.getInputProps("projectName");

  React.useEffect(() => {
    if (isSuccess) {
      context.closeModal(id);
      showNotification({
        title: `WOOO! New project created 🎉`,
        message: `Project ${projectNameProp.value} successfully created!`,

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
      });
    }
    if (isError) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <form
      onSubmit={form.onSubmit(({ projectName, projectDescription }) =>
        mutate({ name: projectName, description: projectDescription })
      )}
    >
      <Stack>
        <TextInput
          label="Project Name"
          placeholder="My super awesome project!"
          disabled={isLoading}
          {...form.getInputProps("projectName")}
          data-autoFocus
        />
        <Textarea
          label="Project Description"
          placeholder="Something about my awesome project!"
          disabled={isLoading}
          {...form.getInputProps("projectDescription")}
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
