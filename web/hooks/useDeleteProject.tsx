import axios from "axios";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { deleteProjectEndpoint, getAllProjectsEndpoint } from "../api/config";
import { Project } from "../api/dto";

const deleteProject = (id: string) => {
  return axios
    .delete(deleteProjectEndpoint(id))
    .then((res) => res.data) as Promise<Project>;
};

const useDeleteProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation((id: string) => deleteProject(id), {
    onSuccess: (data, variables, context) => {
      revalidate(getAllProjectsEndpoint);
    },
  });
};

export default useDeleteProject;
