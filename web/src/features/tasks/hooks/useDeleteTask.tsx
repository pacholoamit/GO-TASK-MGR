import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { Task } from "@/features/api/dto";
import {
  deleteTaskEndpoint,
  getAllTasksByProjectEndpoint,
  getAllTasksEndpoint,
} from "@/features/api";

const deleteTask = (id: string) => {
  return axios
    .delete(deleteTaskEndpoint(id))
    .then((res) => res.data) as Promise<Task>;
};

const useDeleteTask = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation((id: string) => deleteTask(id), {
    onSuccess: (data, variables, context) => {
      const projectId = data.projectId?.toString();
      revalidate(getAllTasksByProjectEndpoint(projectId as string));
      revalidate(getAllTasksEndpoint);
    },
  });
};

export default useDeleteTask;
