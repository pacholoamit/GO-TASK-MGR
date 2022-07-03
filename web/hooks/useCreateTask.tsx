import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { createTaskEndpoint, getAllTasksEndpoint } from "../api/config";
import { TaskRequest, Task } from "../api/dto";

const createTask = (data: TaskRequest) => {
  return axios
    .post(createTaskEndpoint, data)
    .then((res) => res.data) as Promise<Task>;
};

const useCreateTask = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation((formData: TaskRequest) => createTask(formData), {
    onSuccess: () => revalidate(getAllTasksEndpoint),
  });
};

export default useCreateTask;
