import { Button, Textarea, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import useCreateProject from "../../hooks/useCreateProject";

const CreateProjectModal = ({ context, id }: ContextModalProps) => {
  const { mutate, isLoading, isSuccess } = useCreateProject();
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

        <Button fullWidth mt="md" type="submit" loading={isLoading}>
          Create a new awesome project!
        </Button>
      </Stack>
    </form>
  );
};

export default CreateProjectModal;
