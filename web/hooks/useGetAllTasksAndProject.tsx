import useGetAllTasksByProject from "./useGetAllTasksByProject";
import useGetProject from "./useGetProject";

interface useGetAllTasksAndProjectProps {
  id: string | string[] | undefined;
}
const useGetAllTasksAndProject = ({ id }: useGetAllTasksAndProjectProps) => {
  const {
    error: projectError,
    project,
    isLoading: projectIsLoading,
  } = useGetProject({ id });
  const {
    isLoading: tasksIsLoading,
    error: tasksError,
    tasks,
  } = useGetAllTasksByProject({ id });

  return {
    isError: projectError && tasksError,
    isLoading: projectIsLoading && tasksIsLoading,
    project,
    tasks,
  };
};

export default useGetAllTasksAndProject;
