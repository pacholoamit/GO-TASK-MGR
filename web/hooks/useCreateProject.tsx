import { useMutation } from "react-query";
import { apiInstance } from "../api/config";
import { CreateProjectRequest, Project } from "../api/dto";

const createProject = ({ name, description }: CreateProjectRequest) => {
  return apiInstance
    .post("/project", { name, description })
    .then((res) => res.data) as Promise<Project>;
};

const useCreateProject = () => {
  return useMutation((formData: CreateProjectRequest) =>
    createProject(formData)
  );
};

export default useCreateProject;
