import { useModals } from "@mantine/modals";

const useCreateTaskModal = () => {
  const modals = useModals();
  const openCreateTaskModal = () =>
    modals.openContextModal("CreateTaskModal", {
      title: "Write a new task",
      centered: true,
      innerProps: {},
    });
  return {
    openCreateTaskModal,
  };
};

export default useCreateTaskModal;
