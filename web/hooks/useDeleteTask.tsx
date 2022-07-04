import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { deleteTaskEndpoint, getAllTasksEndpoint } from "../api/config";
import { Task } from "../api/dto";

const deleteTask = (id: string) => {
  return axios
    .delete(deleteTaskEndpoint(id))
    .then((res) => res.data) as Promise<Task>;
};

const useDeleteTask = () => {
  const { mutate } = useSWRConfig();
  return useMutation((id: string) => deleteTask(id), {
    onSuccess: () => mutate(getAllTasksEndpoint),
  });
};

export default useDeleteTask;
