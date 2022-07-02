import { Navbar, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { FolderPlus, Note } from "tabler-icons-react";

import NavbarButton from "../components/navbar.button";

const ActionsSection: React.FC = () => {
  const modals = useModals();

  const openCreateProjectModal = () =>
    modals.openContextModal("CreateProjectModal", {
      title: "Create Project",
      innerProps: {},
    });
  return (
    <Navbar.Section mx="-x" px="xs">
      <Title order={3}>Actions</Title>
      <NavbarButton
        onClick={() => {}}
        icon={<Note size={16} />}
        color={"red"}
        label={"Write a new Task"}
      />
      <NavbarButton
        onClick={openCreateProjectModal}
        icon={<FolderPlus size={16} />}
        color={"grape"}
        label={"Create a new Project"}
      />
    </Navbar.Section>
  );
};

export default ActionsSection;
