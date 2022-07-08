import useSWR from "swr";
import { getAllTasksByProjectEndpoint } from "../api/config";
import { ProjectWithTasks } from "../api/dto";

interface useGetAllTasksByProjectProps {
  id: string | string[] | undefined;
}

const useGetAllTasksByProject = ({ id }: useGetAllTasksByProjectProps) => {
  const { data, error } = useSWR<ProjectWithTasks>(
    id ? getAllTasksByProjectEndpoint(id as string) : null
  );

  return {
    project: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetAllTasksByProject;
