import useGetAllTasksByProject from "./useGetAllTasksByProject";
import useGetProject from "./useGetProject";

interface useGetAllTasksAndProjectProps {
  id: string | string[] | undefined;
}
const useGetAllTasksAndProject = ({ id }: useGetAllTasksAndProjectProps) => {
  const {
    project,
    isLoading: projectIsLoading,
    IsError: projectError,
  } = useGetProject({ id });
  const {
    tasks,
    isLoading: tasksIsLoading,
    isError: tasksError,
  } = useGetAllTasksByProject({ id });

  return {
    isError: projectError || tasksError,
    isLoading: projectIsLoading && tasksIsLoading,
    project,
    tasks,
  };
};

export default useGetAllTasksAndProject;
