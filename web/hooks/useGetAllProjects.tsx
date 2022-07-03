import useSWR from "swr";
import { getAllProjectsEndpoint } from "../api/config";
import { Projects } from "../api/dto";

const useGetAllProjects = () => {
  const { data, error } = useSWR<Projects>(getAllProjectsEndpoint);

  return {
    allProjects: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllProjects;
