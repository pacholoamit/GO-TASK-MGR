import { ContextModalProps } from "@mantine/modals";
import useCreateTask from "../../hooks/useCreateTask";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const initialValues = {
  taskTitle: "",
  taskDescription: "",
  taskStatus: "",
  taskLabel: "",
};

const schema = z.object({
  taskTitle: z.string().min(1),
  taskDescription: z.string(),
  taskStatus: z.string(),
  taskLabel: z.string(),
});

const CreateTaskModal = ({ context, id }: ContextModalProps) => {
  const { mutate, isLoading, isSuccess, isError, error } = useCreateTask();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  return <div></div>;
};

export default CreateTaskModal;
