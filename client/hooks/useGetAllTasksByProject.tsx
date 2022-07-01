import { useQuery } from "react-query";
import { Project, Tasks } from "../api/dto";
import api from "../config/api";
import useGetAllProjects from "./useGetAllProjects";

interface getAllTasksByProjectArgs {
  projectId: string | string[] | undefined;
}

interface useGetAllTasksByProjectProps {
  projectId: string | string[] | undefined;
}

const getAllTasksByProject = ({ projectId }: getAllTasksByProjectArgs) =>
  api
    .get(`/project/${projectId}/tasks`)
    .then((res) => res.data) as Promise<Tasks>;

const useGetAllTasksByProject = ({
  projectId,
}: useGetAllTasksByProjectProps) => {
  return useQuery<Tasks, Error>(["useGetAllTasksByProject", projectId], () =>
    getAllTasksByProject({ projectId })
  );
};

export default useGetAllTasksByProject;
