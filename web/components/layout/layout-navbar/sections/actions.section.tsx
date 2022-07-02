import { Navbar, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { FolderPlus, Note } from "tabler-icons-react";
import useCreateProjectModal from "../../../../hooks/useCreateProjectModal";
import useCreateTaskModal from "../../../../hooks/useCreateTaskModal";

import NavbarButton from "../navbar.button";

const ActionsSection: React.FC = () => {
  const { openCreateProjectModal } = useCreateProjectModal();
  const { openCreateTaskModal } = useCreateTaskModal();
  return (
    <Navbar.Section mx="-x" px="xs">
      <Title order={3}>Actions</Title>
      <NavbarButton
        onClick={openCreateTaskModal}
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
