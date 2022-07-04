import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import {
  createProjectEndpoint,
  getAllProjectsEndpoint,
  getProjectEndpoint,
} from "../api/config";
import { ProjectRequest, Project } from "../api/dto";

const createProject = ({ name, description }: ProjectRequest) => {
  return axios
    .post(createProjectEndpoint, { name, description })
    .then((res) => res.data) as Promise<Project>;
};

const useCreateProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation((formData: ProjectRequest) => createProject(formData), {
    onSuccess: (data, variables, context) => {
      revalidate(getProjectEndpoint(data.ID.toString()));
      revalidate(getAllProjectsEndpoint);
    },
  });
};

export default useCreateProject;
