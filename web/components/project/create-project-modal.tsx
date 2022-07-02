import { Button, Textarea, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";

const CreateProjectModal = ({ context, id }: ContextModalProps) => {
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
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput
          label="Project Name"
          placeholder="My super awesome project!"
          {...form.getInputProps("projectName")}
          data-autoFocus
        />
        <Textarea
          label="Project Description"
          placeholder="Something about my awesome project!"
          {...form.getInputProps("projectDescription")}
        />

        <Button fullWidth mt="md" type="submit">
          Create a new awesome project!
        </Button>
      </Stack>
    </form>
  );
};

export default CreateProjectModal;
