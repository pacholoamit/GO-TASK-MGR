import { Navbar, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { FolderPlus, Home, Note } from "tabler-icons-react";
import useCreateProjectModal from "../../../../hooks/useCreateProjectModal";
import useTaskContext from "../../../../hooks/useTaskContext";

import NavbarButton from "../navbar.button";

const ActionsSection: React.FC = () => {
  const { newTask } = useTaskContext();
  const { push } = useRouter();
  const { openCreateProjectModal } = useCreateProjectModal();

  const handleNewTask = () => newTask();
  const handleHome = () => push("/");
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
