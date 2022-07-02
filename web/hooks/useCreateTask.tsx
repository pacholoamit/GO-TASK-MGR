import { useMutation } from "react-query";
import { apiInstance } from "../api/config";
import { CreateTaskRequest, Task } from "../api/dto";

const createTask = (data: CreateTaskRequest) => {
  return apiInstance
    .post("/task", data)
    .then((res) => res.data) as Promise<Task>;
};

const useCreateTask = () => {
  return useMutation((formData: CreateTaskRequest) => createTask(formData));
};

export default useCreateTask;
