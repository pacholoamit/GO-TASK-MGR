import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import {
  updateProjectEndpoint,
  getAllProjectsEndpoint,
  getProjectEndpoint,
} from "../api/config";
import { ProjectRequest, Project } from "../api/dto";

const updateProject = (data: Partial<ProjectRequest>) => {
  return axios
    .put(updateProjectEndpoint(data?.ID?.toString() || ""), data)
    .then((res) => res.data) as Promise<Project>;
};

const useUpdateProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation(
    (formData: Partial<ProjectRequest>) => updateProject(formData),
    {
      onSuccess: () => {
        revalidate(getAllProjectsEndpoint);
      },
    }
  );
};

export default useUpdateProject;
