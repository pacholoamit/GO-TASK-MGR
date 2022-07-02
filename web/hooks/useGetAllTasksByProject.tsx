import useSWR from "swr";
import { apiUrl, fetcher } from "../api/config";
import { Tasks } from "../api/dto";

interface useGetAllTasksByProjectProps {
  id: string | string[] | undefined;
}

const useGetAllTasksByProject = ({ id }: useGetAllTasksByProjectProps) => {
  const url = `${apiUrl}/project/${id}/tasks`;
  const { data, error } = useSWR<Tasks>(id ? url : null, id ? fetcher : null);

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasksByProject;
