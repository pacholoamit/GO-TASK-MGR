import React from "react";
import useCreateProjectModal from "@/features/projects/hooks/useCreateProjectModal";
import useTaskContext from "@/features/tasks/hooks/useTaskContext";
import NavbarButton from "@/components/layout/layout-navbar/navbar.button";

import { Navbar, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Home, Note } from "tabler-icons-react";

const ActionsSection: React.FC = () => {
  const { newTask } = useTaskContext();
  const navigate = useNavigate();
  const { openCreateProjectModal } = useCreateProjectModal();

  const handleNewTask = () => newTask();
  const handleHome = () => navigate("/");
  return (
    <Navbar.Section mx="-x" px="xs">
      <Title order={3}>Actions</Title>
      <NavbarButton
        onClick={handleHome}
        icon={<Home size={16} />}
        color={"green"}
        label={"Home"}
      />
      <NavbarButton
        onClick={handleNewTask}
        icon={<Note size={16} />}
        color={"red"}
        label={"New task"}
      />
      <NavbarButton
        onClick={openCreateProjectModal}
        icon={<FolderPlus size={16} />}
        color={"grape"}
        label={"New project"}
      />
    </Navbar.Section>
  );
};

export default ActionsSection;
