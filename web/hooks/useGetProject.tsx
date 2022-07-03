import { Project } from "../api/dto";
import { apiUrl } from "../api/config";
import useSWR from "swr";

interface useGetProjectProps {
  id: string | string[] | undefined;
}

const useGetProject = ({ id }: useGetProjectProps) => {
  const url = `${apiUrl}/project/${id}`;
  const { data, error } = useSWR<Project>(url);
  return {
    project: data,
    isLoading: !error && !data,
    error,
  };
};
export default useGetProject;
