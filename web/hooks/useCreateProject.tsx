import { useMutation } from "react-query";
import { Project } from "../api/dto";
import api from "../config/api";

interface CreateProjectArgs {
  name: string;
  description: string;
}

const createProject = ({ name, description }: CreateProjectArgs) => {
  return api
    .post("/project", { name, description })
    .then((res) => res.data) as Promise<Project>;
};

const useCreateProject = () => {
  return useMutation(
    (formData: CreateProjectArgs) => createProject(formData),
    {}
  );
};

export default useCreateProject;
