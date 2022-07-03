import { Project } from "../api/dto";
import { apiUrl, getProjectEndpoint } from "../api/config";
import useSWR from "swr";

interface useGetProjectProps {
  id: string | string[] | undefined;
}

const useGetProject = ({ id }: useGetProjectProps) => {
  const { data, error } = useSWR<Project, Error>(
    getProjectEndpoint(id as string)
  );
  return {
    project: data,
    isLoading: !error && !data,
    IsError: error,
  };
};
export default useGetProject;
