import { Project } from "../api/dto";
import { apiUrl, fetcher } from "../api/config";
import useSWR from "swr";

interface useGetProjectProps {
  id: string | string[] | undefined;
}

const useGetProject = ({ id }: useGetProjectProps) => {
  const url = `${apiUrl}/project/${id}`;
  const { data, error } = useSWR<Project>(id ? url : null, id ? fetcher : null);
  console.log(id);
  return {
    project: data,
    isLoading: !error && !data,
    error,
  };
};
export default useGetProject;
