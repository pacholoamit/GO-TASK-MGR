import { useMutation } from "react-query";
import { apiInstance } from "../api/config";
import { TaskRequest, Task } from "../api/dto";

const createTask = (data: TaskRequest) => {
  return apiInstance
    .post("/task", data)
    .then((res) => res.data) as Promise<Task>;
};

const useCreateTask = () => {
  return useMutation((formData: TaskRequest) => createTask(formData));
};

export default useCreateTask;
