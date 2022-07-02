import { useQuery } from "react-query";
import { Projects } from "../api/dto";
import api from "../config/api";

const getAllProjects = () =>
  api.get("/projects").then((res) => res.data) as Promise<Projects>;

const useGetAllProjects = () => {
  return useQuery<Projects, Error>("useGetAllProjects", getAllProjects);
};

export default useGetAllProjects;
