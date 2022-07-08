import useSWR from "swr";
import { getAllProjectsEndpoint } from "../api/config";
import { Project } from "../api/dto";

const useGetAllProjects = () => {
  const { data, error } = useSWR<Project[]>(getAllProjectsEndpoint);

  return {
    allProjects: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllProjects;
