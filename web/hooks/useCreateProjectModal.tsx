import { useModals } from "@mantine/modals";

const useCreateProjectModal = () => {
  const modals = useModals();

  const openCreateProjectModal = () =>
    modals.openContextModal("CreateProjectModal", {
      title: "Create a new project",
      centered: true,
      innerProps: {},
    });

  return {
    openCreateProjectModal,
  };
};

export default useCreateProjectModal;
