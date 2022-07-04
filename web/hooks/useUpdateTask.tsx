import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { getAllTasksEndpoint, updateTaskEndpoint } from "../api/config";
import { TaskRequest, Task } from "../api/dto";

export const updateTask = (data: TaskRequest) => {
  return axios
    .put(updateTaskEndpoint(data.ID as number), data)
    .then((res) => res.data) as Promise<Task>;
};

const useUpdateTask = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation((formData: TaskRequest) => updateTask(formData), {
    onSuccess: () => revalidate(getAllTasksEndpoint),
  });
};

export default useUpdateTask;
