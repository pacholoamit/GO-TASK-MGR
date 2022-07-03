import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { createProjectEndpoint, getAllProjectsEndpoint } from "../api/config";
import { CreateProjectRequest, Project } from "../api/dto";

const createProject = ({ name, description }: CreateProjectRequest) => {
  return axios
    .post(createProjectEndpoint, { name, description })
    .then((res) => res.data) as Promise<Project>;
};

const useCreateProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation(
    (formData: CreateProjectRequest) => createProject(formData),
    {
      onSuccess: () => revalidate(getAllProjectsEndpoint),
    }
  );
};

export default useCreateProject;
