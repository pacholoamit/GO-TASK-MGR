import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { apiInstance, apiUrl } from "../api/config";
import { Project } from "../api/dto";

const deleteProject = (id: string) => {
  return apiInstance
    .delete(`/project/${id}`)
    .then((res) => res.data) as Promise<Project>;
};

const useDeleteProject = () => {
  const { mutate } = useSWRConfig();
  return useMutation((id: string) => deleteProject(id), {
    onSuccess: () => mutate(`${apiUrl}/projects`),
  });
};

export default useDeleteProject;
