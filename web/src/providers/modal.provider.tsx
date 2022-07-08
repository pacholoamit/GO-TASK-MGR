import React from "react";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import CreateProjectModal from "@/features/projects/components/create-project-modal";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modals = {
    CreateProjectModal,
  };
  return (
    <MantineModalsProvider modals={modals}>{children}</MantineModalsProvider>
  );
};

export default ModalsProvider;
