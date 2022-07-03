import useSWR from "swr";
import { apiUrl, getAllTasksByProjectEndpoint } from "../api/config";
import { Tasks } from "../api/dto";

interface useGetAllTasksByProjectProps {
  id: string | string[] | undefined;
}

const useGetAllTasksByProject = ({ id }: useGetAllTasksByProjectProps) => {
  const { data, error } = useSWR<Tasks>(
    getAllTasksByProjectEndpoint(id as string)
  );

  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetAllTasksByProject;
