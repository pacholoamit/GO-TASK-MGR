import useSWR from "swr";
import { getAllTasksEndpoint } from "../api/config";
import { Tasks } from "../api/dto";

const useGetAllTasks = () => {
  const { data, error } = useSWR<Tasks>(getAllTasksEndpoint);

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasks;
