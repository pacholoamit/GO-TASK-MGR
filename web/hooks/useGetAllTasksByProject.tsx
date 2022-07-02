import useSWR from "swr";
import { apiUrl, fetcher } from "../api/config";
import { Tasks } from "../api/dto";

interface useGetAllTasksByProjectProps {
  projectId: string | string[] | undefined;
}

const useGetAllTasksByProject = ({
  projectId,
}: useGetAllTasksByProjectProps) => {
  const url = `${apiUrl}/project/${projectId}/tasks`;
  const { data, error } = useSWR<Tasks>(
    projectId ? url : null,
    projectId ? fetcher : null
  );

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasksByProject;
