import { useMutation } from "react-query";
import { apiInstance } from "../api/config";
import { Project } from "../api/dto";

const deleteProject = (id: string) => {
  return apiInstance
    .delete(`/project/${id}`)
    .then((res) => res.data) as Promise<Project>;
};

const useDeleteProject = () => {
  return useMutation((id: string) => deleteProject(id));
};

export default useDeleteProject;
