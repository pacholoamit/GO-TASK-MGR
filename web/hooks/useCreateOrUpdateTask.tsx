import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import {
  createTaskEndpoint,
  getAllTasksByProjectEndpoint,
  getAllTasksEndpoint,
  updateTaskEndpoint,
} from "../api/config";
import { Task, TaskRequest } from "../api/dto";

const createTask = (data: TaskRequest) => {
  return axios
    .post(createTaskEndpoint, data)
    .then((res) => res.data) as Promise<Task>;
};

export const updateTask = (data: TaskRequest) => {
  return axios
    .put(updateTaskEndpoint(data.ID?.toString() as string), data)
    .then((res) => res.data) as Promise<Task>;
};

const useCreateOrUpdateTask = () => {
  const { mutate: revalidate } = useSWRConfig();

  // If Task has an ID then update it else create one
  const handler = (formData: TaskRequest) => {
    formData.projectId = parseInt(formData.projectId as string);
    if (formData.ID) return updateTask(formData);
    return createTask(formData);
  };
  return useMutation(handler, {
    onSuccess: (data, variables, context) => {
      // Revalidate all tasks of the assigned project from Task request
      const projectId = variables.projectId?.toString() || null;

      revalidate(getAllTasksEndpoint);
      revalidate(getAllTasksByProjectEndpoint(projectId as string));
    },
  });
};

export default useCreateOrUpdateTask;
