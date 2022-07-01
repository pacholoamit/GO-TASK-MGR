import { useQuery } from "react-query";
import api from "../config/api";
import { Projects } from "./dto";

const getAllProjects = () =>
  api.get("/projects").then((res) => res.data) as Promise<Projects>;

export { getAllProjects };
