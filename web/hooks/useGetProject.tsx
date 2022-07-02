import { Project } from "../api/dto";
import { apiUrl, fetcher } from "../api/config";
import useSWR from "swr";

interface useGetProjectProps {
  id: string | string[] | undefined;
}

const useGetProject = ({ id }: useGetProjectProps) => {
  const { data, error } = useSWR<Project>(`${apiUrl}/project/${id}`, fetcher);

  return {
    project: data,
    isLoading: !error && !data,
    error: error,
  };
};
export default useGetProject;
