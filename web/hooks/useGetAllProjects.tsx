import useSWR from "swr";
import { apiUrl } from "../api/config";
import { Projects } from "../api/dto";

const useGetAllProjects = () => {
  const url = `${apiUrl}/projects`;
  const { data, error } = useSWR<Projects>(url);

  return {
    allProjects: data,
    isLoading: !error && !data,
    error,
  };
};

export default useGetAllProjects;
