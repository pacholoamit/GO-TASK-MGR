import { useQuery } from "react-query";
import { Project } from "../api/dto";
import api from "../config/api";

interface useGetProjectProps {
  id: string | string[] | undefined;
}
interface GetProjectArgs {
  id: string | string[] | undefined;
}

const getProject = ({ id }: GetProjectArgs) =>
  api.get(`/project/${id}`).then((res) => res.data) as Promise<Project>;

const useGetProject = ({ id }: useGetProjectProps) => {
  return useQuery<Project, Error>([`useGetProject${id}`, id], () =>
    getProject({ id })
  );
};

export default useGetProject;
