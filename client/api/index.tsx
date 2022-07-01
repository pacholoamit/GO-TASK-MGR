import { useQuery } from "react-query";
import api from "../config/api";
import { Project, Projects } from "./dto";

const getAllProjects = () =>
  api.get("/projects").then((res) => res.data) as Promise<Projects>;

interface GetProjectArgs {
  id: string | string[] | undefined;
}
const getProject = ({ id }: GetProjectArgs) =>
  api.get(`/project/${id}`).then((res) => res.data) as Promise<Project>;

export { getAllProjects, getProject };
