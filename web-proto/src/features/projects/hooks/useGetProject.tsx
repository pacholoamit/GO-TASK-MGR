import { Project } from "@/features/api/dto";
import { getProjectEndpoint } from "@/features/api";
import useSWR from "swr";

interface useGetProjectProps {
  id: string | string[] | undefined;
}

const useGetProject = ({ id }: useGetProjectProps) => {
  const { data, error } = useSWR<Project, Error>(
    id ? getProjectEndpoint(id as string) : null
  );
  return {
    project: data,
    isLoading: !error && !data,
    IsError: error,
  };
};
export default useGetProject;
