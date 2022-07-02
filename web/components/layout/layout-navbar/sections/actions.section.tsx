import { Navbar, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { FolderPlus, Note } from "tabler-icons-react";
import useCreateProjectModal from "../../../../hooks/useCreateProjectModal";
import CreateTaskDrawer from "../../../tasks/create-task-drawer";

import NavbarButton from "../navbar.button";

const ActionsSection: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
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
      <CreateTaskDrawer opened={opened} setOpened={setOpened} />
    </Navbar.Section>
  );
};

export default ActionsSection;
