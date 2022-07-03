import useSWR from "swr";
import { apiUrl } from "../api/config";
import { Tasks } from "../api/dto";

const useGetAllTasks = () => {
  const url = `${apiUrl}/tasks`;
  const { data, error } = useSWR<Tasks>(url);

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasks;
