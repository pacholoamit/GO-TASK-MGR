import useSWR from "swr";
import { getAllProjectsEndpoint } from "@/features/api";
import { Project } from "@/features/api/dto";

const useGetAllProjects = () => {
  const { data, error } = useSWR<Project[]>(getAllProjectsEndpoint);

  return {
    allProjects: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllProjects;
