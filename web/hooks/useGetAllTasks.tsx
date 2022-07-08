import useSWR from "swr";
import { getAllTasksEndpoint } from "../api/config";
import { Task } from "../api/dto";

const useGetAllTasks = () => {
  const { data, error } = useSWR<Task[]>(getAllTasksEndpoint);

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasks;
