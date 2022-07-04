import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { getAllTasksEndpoint } from "../api/config";
import { TaskRequest } from "../api/dto";
import { createTask } from "./useCreateTask";
import { updateTask } from "./useUpdateTask";

const useCreateOrUpdateTask = () => {
  const { mutate: revalidate } = useSWRConfig();

  // If Task has an ID then update it else create one
  const handler = (formData: TaskRequest) => {
    if (formData.ID) return updateTask(formData);
    return createTask(formData);
  };
  return useMutation(handler, {
    onSuccess: () => revalidate(getAllTasksEndpoint),
  });
};

export default useCreateOrUpdateTask;
