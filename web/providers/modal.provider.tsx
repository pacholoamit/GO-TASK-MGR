import React from "react";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import CreateTaskModal from "../components/tasks/create-task-modal";
import CreateProjectModal from "../components/project/create-project-modal";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modals = {
    CreateProjectModal,
    CreateTaskModal,
  };
  return (
    <MantineModalsProvider modals={modals}>{children}</MantineModalsProvider>
  );
};

export default ModalsProvider;
