import React from "react";
import useCreateProject from "@/features/projects/hooks/useCreateProject";
import SuccessNotification from "@/components/notifications/success.notification";
import { Button, Textarea, TextInput, Stack, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { z } from "zod";
import { ProjectRequest } from "@/features/api/dto";

const initialValues: ProjectRequest = {
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

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  const { value } = form.getInputProps("name");

  React.useEffect(() => {
    if (isSuccess) {
      context.closeModal(id);
      SuccessNotification({
        title: `WOOO! New project created 🎉`,
        message: `Project ${value} successfully created!`,
      });
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
          data-autofocus
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
