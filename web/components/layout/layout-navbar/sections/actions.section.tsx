import { Navbar, Title } from "@mantine/core";
import React from "react";
import { FolderPlus, Note } from "tabler-icons-react";
import useCreateProjectModal from "../../../../hooks/useCreateProjectModal";
import useTaskContext from "../../../../hooks/useTaskContext";

import NavbarButton from "../navbar.button";

const ActionsSection: React.FC = () => {
  const { setOpened } = useTaskContext();
  const { openCreateProjectModal } = useCreateProjectModal();

  const onClick = () => setOpened(true);
  return (
    <Navbar.Section mx="-x" px="xs">
      <Title order={3}>Actions</Title>
      <NavbarButton
        onClick={onClick}
        icon={<Note size={16} />}
        color={"red"}
        label={"Write a new task"}
      />
      <NavbarButton
        onClick={openCreateProjectModal}
        icon={<FolderPlus size={16} />}
        color={"grape"}
        label={"Create a new project"}
      />
    </Navbar.Section>
  );
};

export default ActionsSection;
