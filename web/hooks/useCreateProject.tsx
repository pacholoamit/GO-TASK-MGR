import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { apiInstance, apiUrl } from "../api/config";
import { CreateProjectRequest, Project } from "../api/dto";

const createProject = ({ name, description }: CreateProjectRequest) => {
  return apiInstance
    .post("/project", { name, description })
    .then((res) => res.data) as Promise<Project>;
};

const useCreateProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  return useMutation(
    (formData: CreateProjectRequest) => createProject(formData),
    {
      onSuccess: () => revalidate(`${apiUrl}/projects`),
    }
  );
};

export default useCreateProject;
