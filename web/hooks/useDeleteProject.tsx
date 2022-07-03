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
  const { mutate } = useSWRConfig();
  return useMutation((id: string) => deleteProject(id), {
    onSuccess: () => mutate(getAllProjectsEndpoint),
  });
};

export default useDeleteProject;
