import useSWR from "swr";
import { getAllTasksEndpoint } from "@/features/api";
import { Task } from "@/features/api/dto";

const useGetAllTasks = () => {
  const { data, error } = useSWR<Task[]>(getAllTasksEndpoint);

  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllTasks;
